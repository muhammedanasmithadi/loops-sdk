import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Group, GroupLoadMatch, GroupListMatch, GroupCreateData } from '../LoopsTypes';
declare class GroupEntity extends LoopsEntityBase<Group> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: GroupEntity): GroupEntity;
    load(this: any, reqmatch?: GroupLoadMatch, ctrl?: Control): Promise<GroupEntity>;
    list(this: any, reqmatch?: GroupListMatch, ctrl?: Control): Promise<GroupEntity[]>;
    create(this: any, reqdata?: GroupCreateData, ctrl?: Control): Promise<GroupEntity>;
}
export { GroupEntity };
