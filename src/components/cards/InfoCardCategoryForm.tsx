import React from "react";

export default function InfoCardCategoryForm() {
  return (
    <div>
      {currentCategory.fixture_type === "groups+playoffs" &&
        getAvailableConfigurations(currentCategory.team_count).length > 1 && (
          <div>
            <Label>Configuración de Grupos</Label>
            <Select
              value={configurationGroups}
              onValueChange={setConfigurationGroups}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getAvailableConfigurations(currentCategory.team_count).map(
                  (config) => (
                    <SelectItem key={config.id} value={config.id}>
                      {config.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        )}

      {(currentCategory.fixture_type === "groups" ||
        currentCategory.fixture_type === "groups+playoffs") && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">
            Información de Configuración
          </h4>
          <div className="text-sm text-blue-800">
            {(() => {
              if (currentCategory.fixture_type === "groups") {
                return (
                  <p>
                    Formato liga: Todos los equipos juegan entre sí una vez.
                    {currentCategory.team_count % 2 === 1 &&
                      " Un equipo descansa por jornada."}
                  </p>
                );
              } else {
                // Grupos + Eliminatoria
                const configuraciones = getAvailableConfigurations(
                  currentCategory.team_count
                );

                if (configuraciones.length > 1) {
                  const configSeleccionada = configuraciones.find(
                    (c) => c.id === configurationGroups
                  );
                  if (configSeleccionada) {
                    return (
                      <p>
                        {configSeleccionada.label}. Luego fase eliminatoria con
                        los equipos clasificados.
                      </p>
                    );
                  }
                } else if (configuraciones.length === 1) {
                  return (
                    <p>
                      {configuraciones[0].label}. Luego fase eliminatoria con
                      los equipos clasificados.
                    </p>
                  );
                } else {
                  const info = calculateGruposInfo(
                    currentCategoria.cantidad_equipos
                  );
                  return (
                    <p>
                      {info.cantidad_grupos} grupos de {info.equipos_por_grupo}{" "}
                      equipos, avanzan {info.avanzan_por_grupo} por grupo. Luego
                      fase eliminatoria.
                    </p>
                  );
                }
              }
            })()}
          </div>
        </div>
      )}

      {currentCategoria.formato_competicion === "ELIMINATORIA" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-medium text-red-900 mb-2">
            Información de Eliminatoria
          </h4>
          <div className="text-sm text-red-800">
            <p>
              Formato eliminatoria: Los equipos se enfrentan en partidos de
              eliminación directa hasta determinar un campeón. Solo se permiten
              4, 8 o 16 equipos para garantizar un bracket balanceado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
