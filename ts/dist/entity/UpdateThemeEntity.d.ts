import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { UpdateTheme, UpdateThemeCreateData } from '../LoopsTypes';
declare class UpdateThemeEntity extends LoopsEntityBase<UpdateTheme> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: UpdateThemeEntity): UpdateThemeEntity;
    create(this: any, reqdata?: UpdateThemeCreateData, ctrl?: Control): Promise<UpdateThemeEntity>;
}
export { UpdateThemeEntity };
