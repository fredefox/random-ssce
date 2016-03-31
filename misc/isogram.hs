-- Better still:
-- Sort array iterate through it to find duplicates.
-- An array is an isogram iff there are no duplicates.
isogram :: Eq a => [a] -> Bool
isogram [] = True
isogram (x:xs) =
    if x `elem` xs then False
    else isogram xs
