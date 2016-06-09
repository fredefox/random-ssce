import Cpr
import Text.Printf
import System.Environment
import LookupPerson

main :: IO ()
main = getArgs >>= mapM_ checkIsCpr

data Status = Valid | Invalid | NonExisting | Existing deriving (Show)

getCprStatus :: String -> IO Status
getCprStatus cpr = if not $ validCpr cpr
    then return Invalid
    else fmap toStatus . lookupPerson $ cpr where
        toStatus (Left _) = NonExisting
        toStatus _        = Existing

checkIsCpr :: String -> IO ()
checkIsCpr cpr = printStatus cpr . toStatus . validCpr $ cpr where
    toStatus False = Invalid
    toStatus _     = Valid

checkIsExistingCpr :: String -> IO ()
checkIsExistingCpr cpr = do
    status <- fmap toStatus . lookupPerson $ cpr
    printStatus cpr status where
        toStatus (Left _) = NonExisting
        toStatus _        = Existing

printStatus :: PrintfType r => String -> Status -> r
printStatus cpr = printIt . statusToString where
    printIt status = printf "%-8s %s\n" status cpr

statusToString :: Status -> String
statusToString Valid       = "VALID"
statusToString Invalid     = "INVALID"
statusToString NonExisting = "NOEXIST"
statusToString Existing    = "EXIST"
