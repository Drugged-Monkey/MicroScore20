export interface IAuthProvider {
    name: string;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}