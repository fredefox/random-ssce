import Cpr
import Text.Printf
import System.Environment

main :: IO ()
main = getArgs >>= mapM_ checkIsCpr

checkIsCpr :: String -> IO ()
checkIsCpr s = printf "%-8s %s\n" t s where
    t | validCpr s = "VALID"
      | otherwise  = "INVALID"
