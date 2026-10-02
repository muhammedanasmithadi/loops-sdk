import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { UpdateComponent, UpdateComponentCreateData } from '../LoopsTypes';
declare class UpdateComponentEntity extends LoopsEntityBase<UpdateComponent> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: UpdateComponentEntity): UpdateComponentEntity;
    create(this: any, reqdata?: UpdateComponentCreateData, ctrl?: Control): Promise<UpdateComponentEntity>;
}
export { UpdateComponentEntity };
