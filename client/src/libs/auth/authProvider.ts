export interface IAuthProvider {
    name: string;
    signIn: (onSignedIn?: () => {}) => Promise<void>;
    signOut: (onSignedOut?: () => {}) => Promise<void>;
}