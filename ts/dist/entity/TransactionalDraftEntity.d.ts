import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { TransactionalDraft, TransactionalDraftCreateData } from '../LoopsTypes';
declare class TransactionalDraftEntity extends LoopsEntityBase<TransactionalDraft> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: TransactionalDraftEntity): TransactionalDraftEntity;
    create(this: any, reqdata?: TransactionalDraftCreateData, ctrl?: Control): Promise<TransactionalDraftEntity>;
}
export { TransactionalDraftEntity };
