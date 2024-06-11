import admin from 'firebase-admin';
import * as serviceAccount from './../../../service-account.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const Database = admin.firestore();