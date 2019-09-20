const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     const user = {
//         first_name: req.query.first_name,
//         last_name: req.query.last_name,
//     }
//     await admin.database().ref('/users').push({user: user});
//     //res.redirect(303, snapshot.ref.toString());
// });
exports.addUser = functions.https.onCall((data, context) => {

    console.log('AAAAAAAAAAAAAAAAAAAA!!!');
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    if (!data.user) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "user" containing his name but undefined given.');
    }

    return admin.database().ref('/users' + data.user.uid).push({
        user: data.user,
    }).then(() => {
        console.log('New Message written');
        return { user: data.user };
    })
});

// exports.makeUppercase = functions.database.ref('/users/{pushId}/original')
//     .onCreate((snapshot, context) => {
//       const original = snapshot.val();
//       console.log('Uppercasing', context.params.pushId, original);
//       const uppercase = original.toUpperCase();
//       return snapshot.ref.parent.child('uppercase').set(uppercase);
//     });