package store

import (
	"errors"
	"fmt"
	"github.com/NubeIO/git/pkg/git"
	fileutils "github.com/NubeIO/lib-dirs/dirs"
	"github.com/NubeIO/lib-rubix-installer/installer"
	log "github.com/sirupsen/logrus"
	"os"
	"path/filepath"
	"strings"
)

const nonRoot = 0700
const root = 0777

var FilePerm = root
var gitClient *git.Client

type Store struct {
	App               *installer.App
	Perm              int    `json:"file_perm"`
	UserPath          string `json:"user_path"`
	UserStorePath     string `json:"user_store_path"`
	UserStoreAppsPath string `json:"user_store_apps_path"`
	Version           string `json:"version"` // v1.1.1
	Owner             string `json:"owner"`   // NubeIO
	Repo              string `json:"repo"`
	Arch              string `json:"arch"`
	ServiceFile       string `json:"service_file"`
}

func New(store *Store) (*Store, error) {
	homeDir, _ := fileutils.Dir()
	if store == nil {
		return nil, errors.New("store can not be empty")
	}
	if store.App == nil {
		return nil, errors.New("app can not be empty")
	}
	if store.Owner == "" {
		store.Owner = "NubeIO"
	}
	if store.Repo == "" {
		return nil, errors.New("repo can not be empty, try rubix-wires")
	}
	if store.Version == "" {
		return nil, errors.New("version can not be empty, try v0.1.1")
	}
	if store.UserPath == "" {
		store.UserPath = filePath(fmt.Sprintf("%s/rubix", homeDir))
	}
	if store.UserStorePath == "" {
		store.UserStorePath = filePath(fmt.Sprintf("%s/store", store.UserPath))
	}
	if store.UserStoreAppsPath == "" {
		store.UserStoreAppsPath = filePath(fmt.Sprintf("%s/apps", store.UserStorePath))
	}
	if store.Perm == 0 {
		store.Perm = FilePerm
	}
	if store.App.FilePerm == 0 {
		store.App.FilePerm = FilePerm
	}
	if store.App.DataDir == "" {
		store.App.DataDir = "/data"
	}
	store.App = installer.New(store.App)
	return store, nil
}

// filePath make the file path work for unix or windows
func filePath(path string, debug ...bool) string {
	updated := filepath.FromSlash(path)
	if len(debug) > 0 {
		if debug[0] {
			log.Infof("existing-path: %s", path)
			log.Infof("updated-path: %s", updated)
		}
	}
	return filepath.FromSlash(updated)
}

func empty(name string) error {
	if name == "" {
		return errors.New("can not be empty")
	}
	return nil
}

func emptyPath(path string) error {
	if path == "" {
		return errors.New("path can not be empty")
	}
	return nil
}

func checkDir(path string) error {
	path = filePath(path)
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return err
	}
	return nil
}

func checkVersion(version string) error {
	if version[0:1] != "v" { // make sure have a v at the start v0.1.1
		return errors.New(fmt.Sprintf("incorrect provided:%s version number try: v1.2.3", version))
	}
	p := strings.Split(version, ".")
	if len(p) >= 2 && len(p) < 4 {
	} else {
		return errors.New(fmt.Sprintf("incorrect lenght provided:%s version number try: v1.2.3", version))
	}
	return nil
}

func userHomeDir() string {
	homeDir, _ := fileutils.Dir()
	return homeDir
}