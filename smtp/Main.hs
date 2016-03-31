{-# LANGUAGE OverloadedStrings #-}

import Network.Mail.SMTP
import qualified Data.Text as T
import System.Environment

main  = getArgs
    >>= handleArgs
    >>= sendSampleMail

handleArgs :: [String] -> IO String
handleArgs []    = return sampleSmtpServer
handleArgs (x:_) = return x

sampleSmtpServer = "127.0.0.1"

addr n e = Address (Just n) e

sampleMail = simpleMail
    sndr [recp] [] [] subj [part] where
        sndr = addr "form" "from@example.org"
        recp = addr "to" "to@example.org"
        subj = "subject"
        part = plainTextPart "part"

sendSampleMail h = sendMail h sampleMail
