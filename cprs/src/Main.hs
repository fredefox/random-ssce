import Cpr
import Text.Printf
import System.Environment
import LookupPerson

main :: IO ()
main = getArgs >>= mapM_ checkIsCpr

checkIsCpr :: String -> IO ()
checkIsCpr s = printStatus t s where
    t | validCpr s = "VALID"
      | otherwise  = "INVALID"

checkIsExistingCpr :: String -> IO ()
checkIsExistingCpr cpr = do
    s <- lookupPerson cpr
    let t = case s of
            (Left _) -> "NOEXIST"
            _        -> "EXIST"
    printStatus t cpr

printStatus :: PrintfType r => r
printStatus = printf "%-8s %s\n"
