import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Complete, CompleteCreateData } from '../LoopsTypes';
declare class CompleteEntity extends LoopsEntityBase<Complete> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: CompleteEntity): CompleteEntity;
    create(this: any, reqdata?: CompleteCreateData, ctrl?: Control): Promise<CompleteEntity>;
}
export { CompleteEntity };
