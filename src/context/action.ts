export default interface Action<T extends any> {
    type: string;
    payload: Partial<T>; 
}