#! /bin/bash


function do_upgrade {
  HIER=$(pwd)
  cd $1
  echo ============================================================
  echo == 
  echo == Aktualisiere  $(pwd)
  echo ==
  echo ============================================================
  

  npm install --save --save-exact react-scripts@3.1.2 react@16.9.0 react-dom@16.9.0
  rm -rf node_modules

  cd $HIER
}

function upgrade {

  HIER=$(pwd)
  cd $1

  for i in *; do

    if [ ! -d "$i" ]; then
      echo $i ist kein verzeichnis
      continue;
    fi;

    if [ $i == "anhang" ]; then
      upgrade $i
    fi;

    do_upgrade $i

  done;

 cd $HIER
}

upgrade .

