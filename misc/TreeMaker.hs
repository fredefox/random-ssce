-- Repeatedly groups a linear structure into a tree.
-- [ Person { Name = "Frederik", country = "Denmark" }
-- , Person { Name = "Tihana"  , country = "Croatia" }
-- , Person { Name = "Karin"   , country = "Denmark" }
-- ]
-- Becomes
-- [("Denmark", ["Frederik", "Karin"]), ("Croatia", ["Tihana"])]
makeLevel :: Eq b => (a -> b) -> [a] -> [(b, a)]
makeLevel idxr = foldl maybeInsert [] where
    maybeInsert :: [(b, a)] -> a -> [(b, a)]
    maybeInsert = undefined

idxr0 = name

mi :: [(a, b)] -> b -> [(a, b)]
mi acc x = undefined -- (mi2 acc) . lookup (idxr0 x) acc

mi2 acc a (Just as) = acc
mi2 acc a Nothing = [a]

doMi = mi []

data Person = Person { name :: String, country :: String }
sample =
    [ Person { name = "Frederik", country = "Denmark" }
    , Person { name = "Tihana"  , country = "Croatia" }
    , Person { name = "Karin"   , country = "Denmark" }
    ]
