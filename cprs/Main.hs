import System.Environment
import Data.Char (isDigit, digitToInt, intToDigit)
import Control.Monad ((>=>))
import Data.Maybe (catMaybes)

main :: IO ()
main = print $ take 10 cprs
-- main = getArgs >>= parseArgs >>=

{-| A @Cpr@ is a 10-digit long string that follows a specific pattern -}
type Cpr = String

--instance Enum Cpr where

cprs :: [Cpr]
-- loop through all combinations of 9 digits and calculate the remainder.
cprs = catMaybes maybeCprs

maybeCprs :: [Maybe Cpr]
maybeCprs = map fullfillCpr $ possibilities 8

possibilities :: Int -> [String]
possibilities 0 = digits
possibilities x  = (++) <$> digits <*> (possibilities . pred $ x)

digits = map (\x -> [intToDigit x]) [0..9]

fullfillCpr :: String -> Maybe Cpr
fullfillCpr x = fmap ((++) x . (\x -> [x]) . intToDigit) $ maybeLastCprDigit x

maybeLastCprDigit :: String -> Maybe Int
maybeLastCprDigit = maybeChecksum >=> lastCprDigit

lastCprDigit :: Int -> Maybe Int
lastCprDigit = maybeGoodEnough . ((-) 11) . (`mod` 11) where
  maybeGoodEnough 10 = Nothing
  maybeGoodEnough x = Just x

maybeChecksum :: String -> Maybe Int
maybeChecksum s
  | length s /= 9         = Nothing
  | not . any isDigit $ s = Nothing
  | otherwise             = Just . checksum . map digitToInt . take 9 $ s

{-| @checksum@ is a partial function. The argument *must* be 9 digits -}
checksum :: [Int] -> Int
checksum = sum . map (uncurry (*)) . zip magicNumber

magicNumber :: [Int]
magicNumber = map digitToInt "432765432"
