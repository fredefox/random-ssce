{-# LANGUAGE OverloadedStrings #-}
module LookupPerson where

import Types.Cpr
--import Network.HTTP
--import Network.HTTP.Base
import Network.URI
import Data.List
import Network.Stream (Result, ConnError)
import Control.Monad
import Data.Bifunctor
import Network.HTTP.Conduit
import Network.BufferType
import Data.ByteString.Lazy (ByteString)
import qualified Data.ByteString.Lazy as B
import Data.ByteString.Lazy.Char8 (unpack)
import Data.ByteString.Char8 (pack)
import Network.HTTP.Types.Status
import Control.Monad.Trans.Resource (runResourceT)

data NoPersonError
  = ConnError ConnError
  | HttpError String

lookupPerson :: Cpr -> IO (Either String Person)
lookupPerson cpr = do
    mgr <- newManager tlsManagerSettings
    runResourceT $ fetchPerson mgr cpr

toPerson :: Response ByteString -> Either String Person
toPerson s
  | statusIsSuccessful . responseStatus $ s
    = Right . Person . unpack . responseBody $ s
  | otherwise
    = Left . unpack . responseBody $ s

--fetchPerson :: Cpr -> IO (Either String Person)
fetchPerson mgr cpr = case endpoint [("Cpr", cpr)] of
  Nothing   -> fail "Malformed request"
  (Just r)  -> toPerson `fmap` httpLbs r mgr

--doHttp :: Request -> IO (Response ByteString)
doHttp req = newManager tlsManagerSettings >>= httpLbs req

type Param = (String, String)

mkQuery :: [Param] -> String
mkQuery [] = []
mkQuery xs = ("?" ++) . intercalate "&" . map one $ xs where
    one :: Param -> String
    one (a, b) = a ++ "=" ++ b

endpoint :: [Param] -> Maybe Request
endpoint query = doQuery query . parseUrl $ url where
  doQuery :: [Param] -> Maybe Request -> Maybe Request
  doQuery params = fmap (blarg params)
  blarg = setQueryString . map (\(a, b) -> (pack a, Just . pack $ b))

url = "https://energinord.dk/umbraco/api/stamdata/VerifyCpr"
