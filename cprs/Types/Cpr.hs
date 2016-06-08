{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-}

module Types.Cpr where

import GHC.Generics
import Data.Aeson

{-| A @Cpr@ is a 10-digit long string that follows a specific pattern -}
type Cpr = String

data Person = Person
    { adresse :: Address
    , adresseOgNavneBeskyttelse :: Bool
    , navn :: String
    , reklameBeskyttelse :: Bool
    , telefonnummer :: Maybe String
    } deriving (Generic, Show)

instance ToJSON Person where

instance FromJSON Person where
  parseJSON (Object v) =
    Person
      <$> v .: "Adresse"
      <*> v .: "AdresseOgNavneBeskyttelse"
      <*> v .: "Navn"
      <*> v .: "ReklameBeskyttelse"
      <*> v .: "Telefonnummer"

data Address = Address
  { kvhxCode :: KvhxCode
  , postalCode :: PostalCode
  , cityName :: Maybe String
  , address :: Maybe String
  , streetName :: Maybe String
  } deriving (Generic, Show)

instance ToJSON Address where

instance FromJSON Address where
  parseJSON (Object v)
    = Address
      <$> v .: "KVHXKode"
      <*> v .: "Postnr"
      <*> v .: "Supplerendebynavn"
      <*> v .: "TilAdresse"
      <*> v .: "Vejnavn"

data KvhxCode = KvhxCode
  { houseNumber :: String
  , municipalCode :: String
  , floor :: Maybe String
  , side :: Maybe String
  , roadCode :: Maybe String
  } deriving (Generic, Show)

instance ToJSON KvhxCode where

instance FromJSON KvhxCode where
  parseJSON (Object v)
    = KvhxCode
      <$> v .: "Husnummer"
      <*> v .: "KommuneKode"
      <*> v .: "Sal"
      <*> v .: "Side"
      <*> v .: "Vejkode"


data PostalCode = PostalCode
  { postalDistrict :: Maybe String
  , postalC :: Maybe String
  } deriving (Generic, Show)

instance ToJSON PostalCode where

instance FromJSON PostalCode where
  parseJSON (Object v)
    = PostalCode
      <$> v .: "PostDistrikt"
      <*> v .: "Postnr"
