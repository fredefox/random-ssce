--------------------------------------------------------------------------------
-- | This program calculates the binomial coeffectient. The purpose of the
-- program is to demonstrate a nice clean way of handling user input.
-- See @main@.
--------------------------------------------------------------------------------

import System.Environment
import Text.Read
import Text.Printf

-- | We expect the input to be two integers, in case the input is anything
-- else we perform the IO-action usage that instructs the user on how to use
-- the program. The variable parts (ie. parts not specific to this program) are:
-- 1) The first pattern in `go`;
-- 2) The definition of `usage`
-- 3) The definition of `mainFunc`
main = fmap handleArgs getArgs >>= go where
    go (Just (a, b)) = print $ mainFunc a b
    go _             = usage

handleArgs :: [String] -> Maybe (Integer, Integer)
handleArgs (a:b:_) = do
    a <- readMaybe a
    b <- readMaybe b
    return (a, b)
handleArgs _ = Nothing

mainFunc = choose

usage = getProgName >>= putStrLn . printf "Usage: %s a b"

choose :: Integer -> Integer -> Integer
choose _ 0 = 1
choose 0 _ = 0
choose n k = choose (n-1) (k-1) * n `div` k
