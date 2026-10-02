import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { MailingList, MailingListListMatch } from '../LoopsTypes';
declare class MailingListEntity extends LoopsEntityBase<MailingList> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: MailingListEntity): MailingListEntity;
    list(this: any, reqmatch?: MailingListListMatch, ctrl?: Control): Promise<MailingListEntity[]>;
}
export { MailingListEntity };
