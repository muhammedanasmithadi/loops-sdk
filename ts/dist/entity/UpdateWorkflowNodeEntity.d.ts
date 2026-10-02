import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { UpdateWorkflowNode, UpdateWorkflowNodeCreateData } from '../LoopsTypes';
declare class UpdateWorkflowNodeEntity extends LoopsEntityBase<UpdateWorkflowNode> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: UpdateWorkflowNodeEntity): UpdateWorkflowNodeEntity;
    create(this: any, reqdata?: UpdateWorkflowNodeCreateData, ctrl?: Control): Promise<UpdateWorkflowNodeEntity>;
}
export { UpdateWorkflowNodeEntity };
