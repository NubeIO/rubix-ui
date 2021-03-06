import {main, model} from "../../../../../../wailsjs/go/models";
import {
    AddNetwork,
    DeleteNetwork, DeleteNetworkBulk,
    EditNetwork,  GetFlowNetworkSchema,
    GetNetwork,
    GetNetworks
} from "../../../../../../wailsjs/go/main/App";
import {Helpers} from "../../../../../helpers/checks";

function hasUUID(uuid: string): Error {
    return Helpers.IsUndefined(uuid, "host or connection uuid") as Error
}


export class FlowNetworkFactory {
    hostUUID!: string;
    connectionUUID!: string;
    uuid!: string;
    _this!: model.Network;

    get this(): model.Network {
        return this._this;
    }

    set this(value: model.Network) {
        this._this = value;
    }

    async GetAll(withDevice:boolean): Promise<Array<model.Network>> {
        let all: Promise<Array<model.Network>> = {} as Promise<Array<model.Network>>
        hasUUID(this.hostUUID)
        await GetNetworks(this.connectionUUID, this.hostUUID, withDevice).then(res => {
            all = res as unknown as Promise<Array<model.Network>>
        }).catch(err => {
            return undefined
        })
        return all
    }

    async GetOne(withDevice:boolean): Promise<model.Network> {
        hasUUID(this.uuid)
        let one: model.Network = {} as model.Network
        await GetNetwork(this.connectionUUID, this.hostUUID, this.uuid, withDevice).then(res => {
            one = res as model.Network
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }


    async Add(body: model.Network): Promise<model.Network> {
        // hasUUID(this.uuid)
        let one: model.Network = {} as model.Network
        await AddNetwork(this.connectionUUID, this.hostUUID, body).then(res => {
            one = res as model.Network
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }

    async Update(body: model.Network): Promise<model.Network> {
        hasUUID(this.uuid)
        let one: model.Network = {} as model.Network
        await EditNetwork(this.connectionUUID, this.hostUUID, this.uuid, body).then(res => {
            one = res as model.Network
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }

    async Delete(): Promise<model.Network> {
        hasUUID(this.uuid)
        let one: model.Network = {} as model.Network
        await DeleteNetwork(this.connectionUUID, this.hostUUID, this.uuid).then(res => {
            one = res as model.Network
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }

    async BulkDelete(uuids: Array<main.UUIDs>): Promise<any> {
        let out: Promise<any> = {} as Promise<any>
        await DeleteNetworkBulk(this.connectionUUID, this.hostUUID, uuids).then(res => {
            out = res as Promise<any>
        }).catch(err => {
            return undefined
        })
        return out
    }


    async Schema(connUUID:string, hostUUID:string, setPluginName:string):Promise<any> {
        let all: Promise<any> = {} as Promise<any>
        hasUUID(connUUID)
        hasUUID(hostUUID)
        await GetFlowNetworkSchema(connUUID, hostUUID, setPluginName).then(res => {
            res.plugin_name = setPluginName;
            all = res as unknown as Promise<any>

        }).catch(err => {
            return undefined
        })
        return all
    }

}