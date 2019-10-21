import * as firebase from "firebase/app";
import "firebase/messaging";

let messaging;

if (firebase.messaging.isSupported()) {

        const initializedFirebaseApp = firebase.initializeApp({
            messagingSenderId: "829340569792"
        });
        messaging = initializedFirebaseApp.messaging();
        messaging.usePublicVapidKey(
            "BMJ6FadiHUBCERDUWs7hRcOQ56JCvRYCFE4HGRQcKxmebB8HetD5-Y242qP2TdRD1bWefyShN7GL9gVVEDiRLms"
        );

}
export default messaging;