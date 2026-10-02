import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Component, ComponentLoadMatch, ComponentListMatch, ComponentCreateData } from '../LoopsTypes';
declare class ComponentEntity extends LoopsEntityBase<Component> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ComponentEntity): ComponentEntity;
    load(this: any, reqmatch?: ComponentLoadMatch, ctrl?: Control): Promise<ComponentEntity>;
    list(this: any, reqmatch?: ComponentListMatch, ctrl?: Control): Promise<ComponentEntity[]>;
    create(this: any, reqdata?: ComponentCreateData, ctrl?: Control): Promise<ComponentEntity>;
}
export { ComponentEntity };
