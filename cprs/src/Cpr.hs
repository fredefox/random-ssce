module Cpr (cprs, validCpr) where

import Data.Char (isDigit, digitToInt, intToDigit)
import Control.Monad ((>=>))
import Data.Maybe (mapMaybe)
import Types.Cpr
import Data.Word (Word8)

cprs :: [Cpr]
cprs = mapMaybe mkCpr candidates

mkCpr :: String -> Maybe Cpr
mkCpr x = ((x ++) . show) <$> maybeLastCprDigit x

-- Returns a list of 9 characters
candidates :: [String]
candidates = do
  month <- monthsOfTheYear
  day <- days month
  year <- years
  ext <- go 2
  return $ day ++ monthStr month ++ year ++ ext where
    go :: Word8 -> [String]
    go 0 = digits
    go n = (++) <$> digits <*> (go . pred) n
    days m  = map (zpad 2 . show) [1..daysIn m]
    monthStr :: Month -> String
    monthStr = zpad 2 . show . succ . fromEnum
    years   = map (zpad 2 . show) . reverse $ [0..99::Int]

zpad :: Int -> String -> String
zpad n s
  | n <= 0        = s
  | length s >= n = s
  | otherwise     = '0':(zpad (n-1) s)

digits :: [String]
digits = map (\x -> [intToDigit x]) [0..9]

maybeLastCprDigit :: String -> Maybe Int
maybeLastCprDigit = maybeChecksum >=> lastCprDigit

lastCprDigit :: Int -> Maybe Int
lastCprDigit = maybeGoodEnough . (11 -) . (`mod` 11) where
  maybeGoodEnough 11 = Nothing
  maybeGoodEnough 10 = Nothing
  maybeGoodEnough x = Just x

maybeChecksum :: String -> Maybe Int
maybeChecksum s
  | length s /= 9         = Nothing
  | not . any isDigit $ s = Nothing
  | otherwise             = Just . checksum . map digitToInt . take 9 $ s

validCpr :: String -> Bool
validCpr s
  | length s /= 10 = False
  | otherwise      = case maybeLastCprDigit . take 9 $ s of
    Nothing  -> False
    (Just d) -> last s == intToDigit d

{-| @checksum@ is a partial function. The argument *must* be 9 digits -}
checksum :: [Int] -> Int
checksum = sum . zipWith (*) magicNumber

magicNumber :: [Int]
magicNumber = map digitToInt "432765432"

data Month = Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep
    | Oct | Nov | Dec deriving (Show, Enum)

monthsOfTheYear :: [Month]
monthsOfTheYear = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]

daysIn :: Month -> Int
daysIn Jan = 31
daysIn Feb = 29 -- Sometimes
daysIn Mar = 31
daysIn Apr = 30
daysIn May = 31
daysIn Jun = 30
daysIn Jul = 31
daysIn Aug = 31
daysIn Sep = 30
daysIn Oct = 31
daysIn Nov = 30
daysIn Dec = 31
