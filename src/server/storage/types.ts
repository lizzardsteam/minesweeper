export interface StorageCreation {
    Create(): boolean | string
}

export interface StorageUpdate {
    Update(): boolean
}

export interface StorageDeletion {
    Delete(): boolean
}

export interface StorageFindAll<ResponseType> {
    FindAll(): ResponseType[]
}
