import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { CreateWorkflowNode, CreateWorkflowNodeCreateData } from '../LoopsTypes';
declare class CreateWorkflowNodeEntity extends LoopsEntityBase<CreateWorkflowNode> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: CreateWorkflowNodeEntity): CreateWorkflowNodeEntity;
    create(this: any, reqdata?: CreateWorkflowNodeCreateData, ctrl?: Control): Promise<CreateWorkflowNodeEntity>;
}
export { CreateWorkflowNodeEntity };
