{-# LANGUAGE OverloadedStrings #-}
module LookupPerson (lookupPerson) where

import Types.Cpr
--import Network.HTTP
--import Network.HTTP.Base
import Network.HTTP.Conduit
import Data.ByteString.Lazy (ByteString)
import Data.ByteString.Lazy.Char8 (unpack)
import Data.ByteString.Char8 (pack)
import Network.HTTP.Types.Status
import Network.HTTP.Simple (setRequestIgnoreStatus)
import Control.Monad.Trans.Resource (runResourceT, ResourceT)
import Data.Aeson
import Control.Arrow ((***))

lookupPerson :: Cpr -> IO (Either String Person)
lookupPerson cpr = do
    mgr <- newManager tlsManagerSettings
    runResourceT $ fetchPerson mgr cpr

toPerson :: Response ByteString -> Either String Person
toPerson s
  | statusIsSuccessful . responseStatus $ s
    = decodeToEither. responseBody $ s
  | otherwise
    = Left . unpack . responseBody $ s where
      decodeToEither :: ByteString -> Either String Person
      decodeToEither x = case decode x of
        Nothing -> Left $ "Response is invalid JSON (" ++ unpack x ++ ")"
        (Just p) -> Right p

fetchPerson :: Manager -> String -> ResourceT IO (Either String Person)
fetchPerson mgr cpr = case endpoint [("Cpr", cpr)] of
  Nothing   -> fail "Malformed request"
  (Just r)  -> toPerson `fmap` httpLbs r mgr

type Param = (String, String)

endpoint :: [Param] -> Maybe Request
endpoint query = doQuery query . parseUrlSafe $ url where
  doQuery :: [Param] -> Maybe Request -> Maybe Request
  doQuery params = fmap (blarg params)
  blarg = setQueryString . map (pack *** (Just . pack))
  parseUrlSafe = fmap setRequestIgnoreStatus . parseUrl

url :: String
url = "https://energinord.dk/umbraco/api/stamdata/VerifyCpr"
