package main

import (
	"bytes"
	"flag"
	"io/ioutil"
	"log"
	"os"
)

func Merge(files []string) ([]byte, error) {
	empty := true
	result := []byte{}
	for _, path := range files {
		wkt, err := ioutil.ReadFile(path)
		if err != nil {
			return nil, err
		}

		if empty {
			empty = false
			result = append(result, []byte("MULTI")...)
			result = append(result, bytes.SplitN(wkt, []byte{'('}, 2)[0]...)
		} else {
			result = append(result, ',')
		}

		wkt = bytes.TrimSpace(wkt)
		wkt = bytes.TrimPrefix(wkt, []byte("POINT"))
		wkt = bytes.TrimPrefix(wkt, []byte("POLYGON"))
		result = append(result, wkt...)
	}
	if len(result) != 0 {
		result = append(result, ')')
	}
	return result, nil
}

func main() {
	flag.Parse()
	result, err := Merge(flag.Args())
	if err != nil {
		log.Printf("E: %v", err)
	}

	os.Stdout.Write(result)
}
