import {
    AddConnection,
    GetConnection,
    GetConnections,
    PingRubixAssist,
    UpdateConnection
} from "../../../wailsjs/go/main/App";
import {storage} from "../../../wailsjs/go/models";
import {Helpers} from "../../helpers/checks";

function hasUUID(uuid: string): Error {
    return Helpers.IsUndefined(uuid, "connection uuid") as Error
}

export class ConnectionFactory {

    uuid!: string;
    private count!: number
    private _this!: storage.RubixConnection

    get this(): storage.RubixConnection {
        return this._this;
    }

    set this(value: storage.RubixConnection) {
        this._this = value;
    }

    public GetTotalCount(): number {
        return this.count
    }

    // will try and ping the remote server
    // example ping 192,1568.15.10:1662
    async PingConnection(): Promise<boolean> {
        let out = false
        await PingRubixAssist(this.uuid).then(res => {
            out = res as boolean
        }).catch(err => {
            return undefined
        })
        return out
    }

    // get the first connection uuid
    async GetFist(): Promise<storage.RubixConnection> {
        let one: storage.RubixConnection = {} as storage.RubixConnection
        await this.GetAll().then(res => {
            one = res.at(0) as storage.RubixConnection
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }

    async GetAll(): Promise<Array<storage.RubixConnection>> {
        let all: Array<storage.RubixConnection> = {} as Array<storage.RubixConnection>
        await GetConnections().then(res => {
            all = res as Array<storage.RubixConnection>
        }).catch(err => {
            return undefined
        })
        return all
    }

    async GetOne(): Promise<storage.RubixConnection> {
        hasUUID(this.uuid)
        let one: storage.RubixConnection = {} as storage.RubixConnection
        await GetConnection(this.uuid).then(res => {
            one = res as storage.RubixConnection
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }

    async Add(): Promise<storage.RubixConnection> {
        hasUUID(this.uuid)
        let one: storage.RubixConnection = {} as storage.RubixConnection
        await AddConnection(this._this).then(res => {
            one = res as storage.RubixConnection
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }

    async Update(): Promise<storage.RubixConnection> {
        hasUUID(this.uuid)
        let one: storage.RubixConnection = {} as storage.RubixConnection
        await UpdateConnection(this.uuid, this._this).then(res => {
            one = res as storage.RubixConnection
            this._this = one
        }).catch(err => {
            return undefined
        })
        return one
    }


}