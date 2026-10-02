import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { ContactPropertySuccess, ContactPropertySuccessCreateData } from '../LoopsTypes';
declare class ContactPropertySuccessEntity extends LoopsEntityBase<ContactPropertySuccess> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ContactPropertySuccessEntity): ContactPropertySuccessEntity;
    create(this: any, reqdata?: ContactPropertySuccessCreateData, ctrl?: Control): Promise<ContactPropertySuccessEntity>;
}
export { ContactPropertySuccessEntity };
