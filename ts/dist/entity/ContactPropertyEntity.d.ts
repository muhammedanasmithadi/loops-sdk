import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { ContactProperty, ContactPropertyListMatch } from '../LoopsTypes';
declare class ContactPropertyEntity extends LoopsEntityBase<ContactProperty> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ContactPropertyEntity): ContactPropertyEntity;
    list(this: any, reqmatch?: ContactPropertyListMatch, ctrl?: Control): Promise<ContactPropertyEntity[]>;
}
export { ContactPropertyEntity };
