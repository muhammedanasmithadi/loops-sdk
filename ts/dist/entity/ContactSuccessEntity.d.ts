import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { ContactSuccess, ContactSuccessCreateData, ContactSuccessUpdateData } from '../LoopsTypes';
declare class ContactSuccessEntity extends LoopsEntityBase<ContactSuccess> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ContactSuccessEntity): ContactSuccessEntity;
    create(this: any, reqdata?: ContactSuccessCreateData, ctrl?: Control): Promise<ContactSuccessEntity>;
    update(this: any, reqdata?: ContactSuccessUpdateData, ctrl?: Control): Promise<ContactSuccessEntity>;
}
export { ContactSuccessEntity };
