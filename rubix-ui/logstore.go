package main

import (
	"fmt"
	"github.com/NubeIO/rubix-ui/backend/storage"
)

func (app *App) GetLogs() interface{} {
	logs, err := app.DB.GetLogs()
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("logs %s", err.Error()))
		return nil
	}
	var resp []storage.Log
	for _, log := range logs { //delete all the data to not show the user
		log.Data = nil
		resp = append(resp, log)

	}
	return resp
}

func (app *App) GetLogsWithData() interface{} {
	logs, err := app.DB.GetLogs()
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("logs %s", err.Error()))
		return nil
	}
	return logs
}

func (app *App) GetLogsByConnection(connUUID string) interface{} {
	logs, err := app.DB.GetLogsByConnection(connUUID)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("logs %s", err.Error()))
		return nil
	}
	return logs
}

func (app *App) DeleteLogBulk(logUUIDs []UUIDs) interface{} {
	for _, uuid := range logUUIDs {
		err := app.DB.DeleteLog(uuid.UUID)
		if err != nil {
			app.crudMessage(false, fmt.Sprintf("deleted log: %s", uuid.UUID))
		} else {
			app.crudMessage(true, fmt.Sprintf("deleted log: %s", uuid.UUID))
		}
	}
	return "ok"
}
