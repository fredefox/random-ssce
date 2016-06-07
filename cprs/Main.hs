import System.Environment
import Data.Char (isDigit, digitToInt, intToDigit)
import Control.Monad ((>=>), forM_)
import Data.Maybe (mapMaybe)
import Types.Cpr

main :: IO ()
main = forM_ cprs putStrLn

--instance Enum Cpr where

cprs :: [Cpr]
-- loop through all combinations of 9 digits and calculate the remainder.
cprs = mapMaybe mkCpr candidates

mkCpr :: String -> Maybe Cpr
mkCpr x = ((x ++) . show) <$> maybeLastCprDigit x

candidates :: [String]
candidates = go 8 where
  go 0 = digits
  go n = (++) <$> digits <*> (go . pred) n

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

{-| @checksum@ is a partial function. The argument *must* be 9 digits -}
checksum :: [Int] -> Int
checksum = sum . zipWith (*) magicNumber

magicNumber :: [Int]
magicNumber = map digitToInt "432765432"
