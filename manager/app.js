'use strict'

const app = require('express')()
const cors = require('cors')
app.use(require('helmet')())
app.options('*', cors())
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json({
    liment: '5mb'
}))
app.use(bodyParser.urlencoded({
    extended: false
}))
const FabricCAServices = require('fabric-ca-client')
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const log = require('log4js')
var logger = log.getLogger('app')
var env = require('./env.json');
logger.level = env.server.log.level

app.post('/start-ca', async function(req, res) {
    logger.info("start fabric CA with request body" + req.body)
    req.body.agent
    req.body.ca
    req.body.

})

app.post('/enrollFabricCAAdmin', async function(req, res) {
    logger.info("enroll admin of fabric CA with request body" + req.body)
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.leader.markany.com'];
        const caTLSCACerts = caInfo.tlsCACerts.path;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        logger.info(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            logger.info('An identity for the admin user "admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);
        logger.info('Successfully enrolled admin user "admin" and imported it into the wallet');

    } catch (error) {
        logger.error(`Failed to enroll admin user "admin": ${error}`);
        res.json({
            succeed: false,
            status_code: 500,
            value: `Failed to enroll admin user "admin": ${error}`
        })
        return
    }
    res.json({
        succeed: true,
        status_code: 200,
        value: 'Successfully enrolled admin user "admin" and imported it into the wallet'
    })
    return
})

app.post('/registerUser', async function(req, res) {
    logger.info("enroll user of fabric network with request body" + req.body)
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.leader.markany.com'];
        const caTLSCACerts = caInfo.tlsCACerts.path;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        logger.info(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get('appUser');
        if (userIdentity) {
            logger.info('An identity for the user "appUser" already exists in the wallet');
            res.json({
                succeed: false,
                status_code: 500,
                value: 'An identity for the user "appUser" already exists in the wallet'
            })
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            logger.info('An identity for the admin user "admin" does not exist in the wallet');
            logger.info('Run the enrollAdmin.js application before retrying');
            res.json({
                succeed: false,
                status_code: 500,
                value: 'An identity for the admin user "admin" does not exist in the wallet'
            })
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'com.markany.leader',
            enrollmentID: 'appUser',
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'appUser',
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('appUser', x509Identity);
        logger.info('Successfully registered and enrolled admin user "appUser" and imported it into the wallet');

    } catch (error) {
        logger.error(`Failed to register user "appUser": ${error}`);
        res.json({
            succeed: false,
            status_code: 500,
            value: `Failed to register user "appUser": ${error}`
        })
        return
    }
    res.json({
        succeed: true,
        status_code: 200,
        value: 'Successfully registered and enrolled admin user "appUser" and imported it into the wallet'
    })
})
exports.app = app