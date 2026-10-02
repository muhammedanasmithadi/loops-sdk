import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { CreateUpload, CreateUploadCreateData } from '../LoopsTypes';
declare class CreateUploadEntity extends LoopsEntityBase<CreateUpload> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: CreateUploadEntity): CreateUploadEntity;
    create(this: any, reqdata?: CreateUploadCreateData, ctrl?: Control): Promise<CreateUploadEntity>;
}
export { CreateUploadEntity };
