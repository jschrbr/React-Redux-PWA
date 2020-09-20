export interface Users {
    email: String,
    password: String,
    confirmPassword: String,
    handle: String,
    cred: String
}


// change to something more generic
// maybe switch to type and move to defs file.
export interface Parts {
    createdAt: String,
    updatedAt: String,
    name: String,
    quantity: Number,
}