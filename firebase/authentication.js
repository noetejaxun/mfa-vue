import {
    createUserWithEmailAndPassword,
    getAuth, getMultiFactorResolver,
    GoogleAuthProvider,
    multiFactor,
    PhoneAuthProvider,
    PhoneMultiFactorGenerator, sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "@firebase/auth";
import {app} from "../firebase/init";

export const auth = getAuth(app)

export async function signInWithGoogle() {
    try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        return true;
    }catch (e) {
        return e;
    }
}

export async function signUp( email, password ) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
    }catch (e) {
        return false;
    }
}

export async function login( email, password ) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    }catch (e) {
        return e;
    }
}

export async function logout() {
    try {
        await signOut(auth);
        return true;
    }catch (e) {
        return false;
    }
}

export function verifyIfUserIsEnrolled( user ) {
    const enrolledFactors = multiFactor(user).enrolledFactors;
    return enrolledFactors.length > 0;
}

export async function verifyPhoneNumber( user, phoneNumber, recaptchaVerifier ) {
    const session = await multiFactor(user).getSession();
    const phoneInfoOptions = {
        phoneNumber,
        session
    }

    const phoneAuthProvider = new PhoneAuthProvider(auth);
    try {
        return await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
    }catch (e) {
        return false;
    }
}

export async function enrollUser( user, verificationCodeId, verificationCode ) {
    const phoneAuthCredential = PhoneAuthProvider.credential(verificationCodeId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);

    try {
        await multiFactor(user).enroll(multiFactorAssertion, 'Personal Phone Number');
        return true;
    }catch (e) {
        return false;
    }
}

export async function verifyUserMFA( error, recaptchaVerifier, selectedIndex ) {
    const resolver = getMultiFactorResolver(auth, error);

    if (resolver.hints[selectedIndex].factorId === PhoneMultiFactorGenerator.FACTOR_ID) {
        const phoneInfoOptions = {
            multiFactorHint: resolver.hints[selectedIndex],
            session: resolver.session
        }

        const phoneAuthProvider = new PhoneAuthProvider(auth);
        try {
            const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
            return { verificationId, resolver }
        }catch (e) {
            return false
        }
    }
}

export async function verifyUserEnrolled( verificationMFA, verificationCode ) {
    const {verificationId, resolver} = verificationMFA;
    const credentials = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credentials);

    try {
        await resolver.resolveSignIn(multiFactorAssertion);
        return true;
    }catch (e) {
        return false;
    }
}

export async function verifyUserEmail( user ) {
    try {
        await sendEmailVerification(user);
        return true;
    }catch (e) {
        return false;
    }
}