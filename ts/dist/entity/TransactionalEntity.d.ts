import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Transactional, TransactionalListMatch, TransactionalCreateData } from '../LoopsTypes';
declare class TransactionalEntity extends LoopsEntityBase<Transactional> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: TransactionalEntity): TransactionalEntity;
    list(this: any, reqmatch?: TransactionalListMatch, ctrl?: Control): Promise<TransactionalEntity[]>;
    create(this: any, reqdata?: TransactionalCreateData, ctrl?: Control): Promise<TransactionalEntity>;
}
export { TransactionalEntity };
