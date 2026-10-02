import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Theme, ThemeLoadMatch, ThemeListMatch, ThemeCreateData } from '../LoopsTypes';
declare class ThemeEntity extends LoopsEntityBase<Theme> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ThemeEntity): ThemeEntity;
    load(this: any, reqmatch?: ThemeLoadMatch, ctrl?: Control): Promise<ThemeEntity>;
    list(this: any, reqmatch?: ThemeListMatch, ctrl?: Control): Promise<ThemeEntity[]>;
    create(this: any, reqdata?: ThemeCreateData, ctrl?: Control): Promise<ThemeEntity>;
}
export { ThemeEntity };
