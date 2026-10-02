import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { ChangeWorkflowMailingList, ChangeWorkflowMailingListCreateData } from '../LoopsTypes';
declare class ChangeWorkflowMailingListEntity extends LoopsEntityBase<ChangeWorkflowMailingList> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ChangeWorkflowMailingListEntity): ChangeWorkflowMailingListEntity;
    create(this: any, reqdata?: ChangeWorkflowMailingListCreateData, ctrl?: Control): Promise<ChangeWorkflowMailingListEntity>;
}
export { ChangeWorkflowMailingListEntity };
