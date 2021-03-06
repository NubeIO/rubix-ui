package main

import (
	"fmt"
	"github.com/NubeIO/nubeio-rubix-lib-models-go/pkg/v1/model"
)

func (app *App) GetFlowPointSchema(connUUID, hostUUID, pluginName string) interface{} {
	_, err := app.resetHost(connUUID, hostUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	sch, err := app.flow.PointSchema(pluginName)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	return sch
}

func (app *App) GetPoints(connUUID, hostUUID string) []model.Point {
	_, err := app.resetHost(connUUID, hostUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	points, err := app.flow.GetPoints()
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	return points
}

func (app *App) GetPointsForDevice(connUUID, hostUUID, deviceUUID string) []*model.Point {
	device, err := app.getDevice(connUUID, hostUUID, deviceUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	return device.Points
}

func (app *App) AddPoint(connUUID, hostUUID string, body *model.Point) *model.Point {
	_, err := app.resetHost(connUUID, hostUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	points, err := app.flow.AddPoint(body)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	return points
}

func (app *App) EditPoint(connUUID, hostUUID, pointUUID string, body *model.Point) *model.Point {
	_, err := app.resetHost(connUUID, hostUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	points, err := app.flow.EditPoint(pointUUID, body)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	return points
}

func (app *App) DeletePointBulk(connUUID, hostUUID string, pointUUIDs []UUIDs) interface{} {
	_, err := app.resetHost(connUUID, hostUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	for _, pnt := range pointUUIDs {
		msg := app.DeletePoint(connUUID, hostUUID, pnt.UUID)
		if err != nil {
			app.crudMessage(false, fmt.Sprintf("delete point error: %s %s", pnt.Name, msg))
		} else {
			app.crudMessage(true, fmt.Sprintf("deleted point: %s", pnt.Name))
		}
	}
	return "ok"
}

func (app *App) DeletePoint(connUUID, hostUUID, pointUUID string) interface{} {
	_, err := app.resetHost(connUUID, hostUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return err
	}
	_, err = app.flow.DeletePoint(pointUUID)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return err
	}
	return "delete ok"
}

func (app *App) GetPoint(connUUID, hostUUID, pointUUID string) *model.Point {
	_, err := app.resetHost(connUUID, hostUUID, true)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	points, err := app.flow.GetPoint(pointUUID)
	if err != nil {
		app.crudMessage(false, fmt.Sprintf("error %s", err.Error()))
		return nil
	}
	return points
}
