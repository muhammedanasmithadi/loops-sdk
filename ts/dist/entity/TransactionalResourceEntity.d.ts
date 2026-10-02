import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { TransactionalResource, TransactionalResourceLoadMatch, TransactionalResourceListMatch, TransactionalResourceCreateData } from '../LoopsTypes';
declare class TransactionalResourceEntity extends LoopsEntityBase<TransactionalResource> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: TransactionalResourceEntity): TransactionalResourceEntity;
    load(this: any, reqmatch?: TransactionalResourceLoadMatch, ctrl?: Control): Promise<TransactionalResourceEntity>;
    list(this: any, reqmatch?: TransactionalResourceListMatch, ctrl?: Control): Promise<TransactionalResourceEntity[]>;
    create(this: any, reqdata?: TransactionalResourceCreateData, ctrl?: Control): Promise<TransactionalResourceEntity>;
}
export { TransactionalResourceEntity };
