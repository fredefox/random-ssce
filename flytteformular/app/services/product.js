angular.module('relocationform')
    .factory('product', ['$q', function($q) {
        return $q.resolve(
            [ { "name": "Markedspris El"
              , "description": "Strøm til kvartalsaktuel markedspris"
              , "price": "580,70 kr"
              , "id": "marketPrice"
              , "selected": true
              , "addons":
                  [{ "name": "Klima El"
                    , "description": "Ren energi produceret på danske vindmøller"
                    , "price": "+ 4 øre/kWh"
                    , "id": "climate"
                    }
                  ]
              }
            , { "name": "ForeningsEl"
              , "description": "Støt din lokale forening &mdash; uden merpris"
              , "price": "598,70 kr"
              , "id": "union"
              , "addons": []
              }
            , { "name": "Lys i Afrika"
              , "description": "Klimavenlig strøm der skaber lys i Afrika"
              , "price": "613,70 kr"
              , "id": "africa"
              , "addons": []
              }
            ]);
    }]).factory('addon', ['$q', function($q) {
        return $q.resolve(
            [
            ]);
    }]);
