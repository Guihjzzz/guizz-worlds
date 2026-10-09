(function () {
  "use strict";

  const input = document.getElementById("world-file");
  const dropzone = document.getElementById("dropzone");
  const status = document.getElementById("status");
  const worldInfoCard = document.getElementById("world-info-card");
  const reportCard = document.getElementById("report-card");
  const pageMain = document.querySelector('main[data-tools-column="true"]');
  const worldSummary = document.getElementById("world-summary");
  const reportTitle = document.getElementById("recovery-report-title");
  const reportContent = document.getElementById("report-content");
  const planCard = document.getElementById("plan-card");
  const planTitle = document.getElementById("plan-title");
  const planList = document.getElementById("plan-list");
  const originalNote = document.getElementById("original-note");
  const actionRow = document.getElementById("action-row");
  const fixButton = document.getElementById("fix-button");
  const copyProgress = document.getElementById("copy-progress");
  const copyProgressMessage = document.getElementById("copy-progress-message");
  const copyProgressPercent = document.getElementById("copy-progress-percent");
  const copyProgressTrack = document.getElementById("copy-progress-track");
  const copyProgressFill = document.getElementById("copy-progress-fill");
  const copyProgressBytes = document.getElementById("copy-progress-bytes");
  const downloadRow = document.getElementById("download-row");
  const downloadMessage = document.getElementById("download-message");
  const downloadLink = document.getElementById("download-link");

  function translated(key, fallback) {
    return window.guizzI18n && window.guizzI18n.t(key) !== key
      ? window.guizzI18n.t(key)
      : fallback;
  }

  function translatedError(key, fallback) {
    lastErrorKey = key;
    return window.guizzI18n && window.guizzI18n.error
      ? window.guizzI18n.error(key, fallback)
      : fallback;
  }

  function localizedStatus(key, fallback) {
    const value = translated(key, key);
    return value === key ? translatedError(key, fallback) : value;
  }

  function propertyLabel(key, fallback) {
    return window.guizzI18n && window.guizzI18n.property
      ? window.guizzI18n.property(key, fallback)
      : fallback;
  }

  function worldText(key, fallback) {
    return window.guizzI18n && window.guizzI18n.worldMeta
      ? window.guizzI18n.worldMeta(key, fallback)
      : fallback;
  }

  function blockerLabel(item) {
    if (window.guizzI18n && window.guizzI18n.blocker) return window.guizzI18n.blocker(item);
    if (item.type === "locked") return "Template ou pacote bloqueado: " + item.name;
    if (item.type === "experiments-used") return "O mundo registra experimentos já utilizados";
    return "Há recursos experimentais ativados";
  }

  const labels = {
    commandsEnabled: "Comandos ativados",
    cheatsEnabled: "Trapaças ativadas",
    hasBeenLoadedInCreative: "Mundo já aberto no modo Criativo",
    GameType: "Modo de jogo salvo como Criativo ou Espectador",
    achievementsDisabled: "Indicador de conquistas desativadas",
    disableAchievements: "Indicador de bloqueio de conquistas"
  };

  let current = null;
  let outputUrl = null;
  let statusKey = "waiting";
  let statusText = "Aguardando um arquivo .mcworld";
  let statusState = "";
  let lastErrorKey = null;
  let copyInProgress = false;
  let copyProgressKey = "preparing";
  let copyProgressDone = 0;
  let copyProgressTotal = 0;
  let lastCopyProgressPaint = 0;
  let lastCopyProgressValue = -1;

  function setStatus(message, state, key) {
    statusKey = key || null;
    statusText = message;
    statusState = state || "";
    status.hidden = false;
    status.textContent = message;
    status.className = "status" + (state ? " is-" + state : "");
  }

  function copyProgressText(key) {
    if (key === "compressing" || key === "finalizing") {
      return window.guizzI18n && window.guizzI18n.progress
        ? window.guizzI18n.progress(key)
        : key === "compressing" ? "Compactando o mundo" : "Finalizando o arquivo";
    }
    return translated("preparing", "Preparando cópia…");
  }

  function updateCopyProgress(key, done, total, force) {
    copyProgressKey = key;
    if (Number.isFinite(done)) copyProgressDone = done;
    if (Number.isFinite(total)) copyProgressTotal = total;
    const percent = key === "finalizing"
      ? 99
      : copyProgressTotal > 0
        ? Math.min(99, Math.floor(copyProgressDone / copyProgressTotal * 100))
        : 0;
    const now = performance.now();
    const phaseChanged = copyProgressMessage && copyProgressMessage.textContent !== copyProgressText(key);
    if (force || phaseChanged || percent !== lastCopyProgressValue || now - lastCopyProgressPaint >= 120) {
      if (copyProgressMessage) copyProgressMessage.textContent = copyProgressText(key);
      if (copyProgressPercent) copyProgressPercent.textContent = percent + "%";
      if (copyProgressTrack) {
        copyProgressTrack.setAttribute("aria-valuenow", String(percent));
        copyProgressTrack.setAttribute("aria-valuetext", percent + "%");
        if (window.guizzI18n && window.guizzI18n.progress) {
          copyProgressTrack.setAttribute("aria-label", window.guizzI18n.progress("label"));
        }
      }
      if (copyProgressFill) copyProgressFill.style.width = percent + "%";
      if (copyProgressBytes) {
        copyProgressBytes.textContent = formatFileSize(copyProgressDone) + " / " + formatFileSize(copyProgressTotal);
      }
      lastCopyProgressValue = percent;
      lastCopyProgressPaint = now;
    }
    if (copyInProgress && fixButton) fixButton.textContent = copyProgressText(key);
    if (copyProgress) copyProgress.classList.toggle("hidden", !copyInProgress);
    status.hidden = true;
  }

  function nextPaint() {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () { requestAnimationFrame(resolve); });
    });
  }

  function zipFilesWithProgress(files, onProgress) {
    const paths = Object.keys(files);
    const totalBytes = paths.reduce(function (sum, path) {
      return sum + (files[path] ? files[path].byteLength : 0);
    }, 0);
    const smallFileLimit = 160 * 1024;
    const chunkSize = 512 * 1024;
    let processedBytes = 0;

    return new Promise(function (resolve, reject) {
      const output = [];
      let settled = false;
      let activeReject = null;
      let zip;

      function fail(error) {
        if (settled) return;
        settled = true;
        if (activeReject) activeReject(error);
        if (zip) {
          try { zip.terminate(); } catch (_) {}
        }
        reject(error instanceof Error ? error : new Error(String(error || "Falha ao compactar o mundo.")));
      }

      function reportProgress(phase) {
        if (typeof onProgress === "function") onProgress(processedBytes, totalBytes, phase);
      }

      function waitForFile(zipFile) {
        const originalOnData = zipFile.ondata;
        return new Promise(function (resolveFile, rejectFile) {
          zipFile.ondata = function (error, chunk, final) {
            try { originalOnData(error, chunk, final); }
            catch (writeError) { rejectFile(writeError); return; }
            if (error) rejectFile(error);
            else if (final) resolveFile();
          };
        });
      }

      function addSmallFile(path, data) {
        const zipFile = new window.fflate.ZipDeflate(path, { level: 6 });
        zip.add(zipFile);
        const fileReady = waitForFile(zipFile);
        zipFile.push(data, true);
        return fileReady.then(function () {
          processedBytes += data.byteLength;
          reportProgress("compressing");
        });
      }

      function addLargeFile(path, data) {
        return new Promise(function (resolveFile, rejectFile) {
          const zipFile = new window.fflate.ZipPassThrough(path);
          zipFile.compression = 8;
          zipFile.flag = 0;

          let stream;
          let fileReject = null;
          let finishActiveChunk = null;
          stream = new window.fflate.AsyncDeflate({ level: 6 }, function (error, chunk, final) {
            if (error) {
              if (fileReject) fileReject(error);
              if (zipFile.ondata) zipFile.ondata(error, null, final);
              return;
            }
            if (zipFile.ondata) zipFile.ondata(null, chunk, final);
            // fflate 0.8.3 may terminate its worker before the final ondrain message is delivered.
            if (final && finishActiveChunk) finishActiveChunk();
          });
          zipFile.process = function (chunk, final) { stream.push(chunk, final); };
          zipFile.terminate = function () { stream.terminate(); };

          try { zip.add(zipFile); }
          catch (error) { stream.terminate(); rejectFile(error); return; }
          const fileReady = waitForFile(zipFile);
          fileReady.catch(function () {});

          async function feed() {
            let offset = 0;
            while (offset < data.byteLength) {
              const end = Math.min(offset + chunkSize, data.byteLength);
              // Worker transfer detaches its input, so use a short-lived copy and preserve the world bytes for retries.
              const chunk = new Uint8Array(data.subarray(offset, end));
              const chunkBytes = chunk.byteLength;
              const final = end === data.byteLength;
              await new Promise(function (resolveChunk, rejectChunk) {
                let drained = 0;
                let done = false;
                function finishChunk() {
                  if (done) return;
                  const remaining = Math.max(0, chunkBytes - drained);
                  if (remaining) {
                    processedBytes += remaining;
                    reportProgress("compressing");
                  }
                  drained = chunkBytes;
                  done = true;
                  fileReject = null;
                  activeReject = null;
                  if (finishActiveChunk === finishChunk) finishActiveChunk = null;
                  resolveChunk();
                }
                fileReject = rejectChunk;
                activeReject = rejectChunk;
                finishActiveChunk = finishChunk;
                stream.ondrain = function (size) {
                  const amount = Math.max(0, Math.min(size, chunkBytes - drained));
                  drained += amount;
                  processedBytes += amount;
                  reportProgress("compressing");
                  if (!done && drained >= chunkBytes) finishChunk();
                };
                try { zipFile.push(chunk, final); }
                catch (error) {
                  fileReject = null;
                  activeReject = null;
                  rejectChunk(error);
                }
              });
              offset = end;
            }
            await fileReady;
            resolveFile();
          }

          feed().catch(rejectFile);
        });
      }

      zip = new window.fflate.Zip(function (error, chunk, final) {
        if (error) { fail(error); return; }
        if (chunk && chunk.byteLength) output.push(chunk);
        if (final && !settled) {
          settled = true;
          resolve(new Blob(output, { type: "application/octet-stream" }));
        }
      });

      async function build() {
        try {
          reportProgress("compressing");
          for (let index = 0; index < paths.length; index += 1) {
            const path = paths[index];
            const data = files[path];
            if (!(data instanceof Uint8Array)) throw new Error("Um arquivo do mundo não pôde ser compactado.");
            if (data.byteLength <= smallFileLimit) await addSmallFile(path, data);
            else await addLargeFile(path, data);
            if (index % 12 === 11) await nextPaint();
          }
          reportProgress("finalizing");
          await nextPaint();
          zip.end();
        } catch (error) {
          fail(error);
        }
      }

      build();
    });
  }

  function setWorldChangeDisabled(disabled) {
    const changeButton = worldInfoCard && worldInfoCard.querySelector(".world-change-button");
    if (changeButton) changeButton.disabled = disabled;
  }

  function clearDownload() {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    outputUrl = null;
    downloadRow.classList.add("hidden");
    downloadLink.removeAttribute("href");
  }

  function resetView() {
    document.body.classList.remove("world-selected");
    pageMain.classList.remove("world-selected");
    clearDownload();
    if (current && current.iconUrl) URL.revokeObjectURL(current.iconUrl);
    current = null;
    input.value = "";
    worldInfoCard.classList.add("hidden");
    reportCard.classList.add("hidden");
    planCard.classList.add("hidden");
    if (copyProgress) copyProgress.classList.add("hidden");
    planList.replaceChildren();
    planList.classList.remove("hidden");
    dropzone.classList.remove("hidden");
    status.hidden = false;
    actionRow.classList.add("hidden");
    reportContent.replaceChildren();
    setStatus(translated("waiting", "Aguardando um arquivo .mcworld"), "", "waiting");
  }

  window.guizzWorldRescueLanguageChanged = function () {
    if (statusKey) setStatus(localizedStatus(statusKey, statusText), statusState, statusKey);
    else setStatus(statusText, statusState);
    if (!current) return;
    if (statusState !== "working" && statusState !== "error") status.hidden = true;
    renderWorldSummary(current);
    renderReport(current.file, current.findings, current.blockers, true);
    if (copyInProgress) {
      actionRow.classList.remove("hidden");
      actionRow.classList.add("is-processing");
      fixButton.disabled = true;
      fixButton.setAttribute("aria-busy", "true");
      fixButton.textContent = copyProgressText(copyProgressKey);
      updateCopyProgress(copyProgressKey, copyProgressDone, copyProgressTotal, true);
      setWorldChangeDisabled(true);
      return;
    }
    if (outputUrl) showDownloadReady();
  };

  function textNode(tagName, className, value) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    node.textContent = value;
    return node;
  }

  function formatFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return "—";
    if (bytes < 1024) return bytes + " B";
    const units = ["KB", "MB", "GB", "TB"];
    const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)) - 1);
    const amount = bytes / Math.pow(1024, index + 1);
    const locale = window.guizzI18n ? window.guizzI18n.language : "pt";
    return amount.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " " + units[index];
  }

  function renderWorldSummary(world) {
    if (!worldSummary || !worldInfoCard) return;
    const metadata = world.metadata;
    worldInfoCard.setAttribute("aria-label", worldText("info", "Informações do mundo"));
    worldSummary.replaceChildren();

    const header = document.createElement("div");
    header.className = "world-summary-head";
    const cover = document.createElement("span");
    cover.className = "world-cover" + (world.iconUrl ? "" : " is-empty");
    const image = document.createElement("img");
    image.alt = "";
    image.draggable = false;
    image.src = world.iconUrl || "../minecraft/items/map.png";
    image.addEventListener("error", function () {
      if (image.dataset.fallback) return;
      image.dataset.fallback = "true";
      image.src = "../minecraft/items/map.png";
    });
    cover.appendChild(image);

    const nameBlock = document.createElement("div");
    nameBlock.className = "world-summary-name";
    nameBlock.appendChild(textNode("p", "tl-ptitle world-summary-title", metadata.name || worldText("defaultName", "Meu Mundo")));
    nameBlock.appendChild(textNode("p", "tl-note world-summary-file", world.file.name + " · " + formatFileSize(world.file.size)));

    const changeButton = textNode("button", "tl-mcbtn world-change-button", "× " + worldText("change", "Alterar"));
    changeButton.type = "button";
    changeButton.title = worldText("change", "Alterar mundo");
    changeButton.addEventListener("click", function () {
      input.value = "";
      input.click();
    });
    header.append(cover, nameBlock, changeButton);

    const gameMode = worldText("mode." + metadata.gameMode, worldText("mode.unknown", "Desconhecido"));
    const modeValue = metadata.hardcore ? gameMode + " · " + worldText("hardcore", "Hardcore") : gameMode;
    const dateValue = metadata.lastPlayed
      ? metadata.lastPlayed.toLocaleDateString(window.guizzI18n ? window.guizzI18n.language : undefined, { day: "numeric", month: "short", year: "numeric" })
      : "—";
    const stats = [
      [worldText("gameMode", "Modo de jogo"), modeValue],
      [worldText("difficulty", "Dificuldade"), worldText("difficulty." + metadata.difficulty, worldText("difficulty.unknown", "Desconhecida"))],
      [worldText("lastPlayed", "Última sessão"), dateValue],
      [worldText("minecraft", "Minecraft"), metadata.version || "—"]
    ];
    const grid = document.createElement("div");
    grid.className = "world-info-grid";
    stats.forEach(function (item) {
      const tile = document.createElement("div");
      tile.className = "world-stat-tile";
      tile.append(textNode("div", "world-stat-value", item[1]), textNode("div", "world-stat-label", item[0]));
      grid.appendChild(tile);
    });
    worldSummary.append(header, grid);
  }

  function worldMetadata(parsed, files, file, levelPath) {
    const root = parsed.root;
    const prefix = levelPath.slice(0, levelPath.lastIndexOf("/") + 1);
    const levelNameTag = findTag(root, "LevelName");
    let name = levelNameTag && levelNameTag.type === 8 ? levelNameTag.value : "";
    const textPath = Object.keys(files).find(function (path) { return path.toLowerCase() === (prefix + "levelname.txt").toLowerCase(); });
    if (textPath) {
      try {
        const exportedName = new TextDecoder("utf-8").decode(files[textPath]).replace(/^\uFEFF/, "").split(/\r?\n/)[0].trim();
        if (exportedName) name = exportedName;
      } catch (_) {}
    }

    const gameType = numericValue(findTag(root, "GameType"));
    const modeNames = { 0: "survival", 1: "creative", 2: "adventure", 5: "survival", 6: "spectator" };
    const difficultyNames = { 0: "peaceful", 1: "easy", 2: "normal", 3: "hard" };
    const difficulty = numericValue(findTag(root, "Difficulty"));
    const lastPlayedSeconds = numericValue(findTag(root, "LastPlayed"));
    const versionTag = findTag(root, "lastOpenedWithVersion");
    let versionParts = [];
    if (versionTag && versionTag.type === 9 && versionTag.value && versionTag.value.elementType === 3) {
      versionParts = versionTag.value.items.slice(0, 3);
    } else if (versionTag && versionTag.type === 11 && Array.isArray(versionTag.value)) {
      versionParts = versionTag.value.slice(0, 3);
    }

    const iconCandidates = ["world_icon.jpeg", "world_icon.jpg", "world_icon.png", "world_icon.webp"];
    const iconPath = Object.keys(files).find(function (path) {
      return iconCandidates.some(function (candidate) { return path.toLowerCase() === (prefix + candidate).toLowerCase(); });
    });
    let iconUrl = null;
    if (iconPath) {
      const extension = iconPath.toLowerCase().split(".").pop();
      const mime = extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : "image/jpeg";
      iconUrl = URL.createObjectURL(new Blob([files[iconPath]], { type: mime }));
    }

    return {
      file: file,
      metadata: {
        name: name || worldText("defaultName", "Meu Mundo"),
        gameMode: modeNames[gameType] || "unknown",
        difficulty: difficultyNames[difficulty] || "unknown",
        lastPlayed: lastPlayedSeconds && lastPlayedSeconds > 0 && Number.isFinite(lastPlayedSeconds) ? new Date(lastPlayedSeconds * 1000) : null,
        version: versionParts.length >= 3 ? versionParts.join(".") : "",
        hardcore: numericValue(findTag(root, "IsHardcore")) > 0 || numericValue(findTag(root, "isHardcore")) > 0
      },
      iconUrl: iconUrl
    };
  }

  function renderReport(file, findings, blockers, preserveDownload) {
    reportContent.replaceChildren();
    planList.replaceChildren();
    planList.classList.remove("hidden");
    actionRow.classList.add("hidden");
    planCard.classList.add("hidden");
    const list = document.createElement("ul");

    if (blockers.length) {
      reportTitle.textContent = worldText("blockedTitle", "Este mundo não pode ser corrigido por aqui");
      reportContent.appendChild(textNode("p", "report-message warning-message",
        translated("blockedReport", "Este mundo tem estados que não podem ser revertidos com segurança por esta ferramenta. Nenhum arquivo será alterado.")));
      list.className = "finding-list";
      blockers.forEach(function (item) {
        const li = document.createElement("li");
        li.appendChild(textNode("span", "finding-title", blockerLabel(item)));
        list.appendChild(li);
      });
      reportContent.appendChild(list);
      if (!preserveDownload) clearDownload();
      return;
    }

    if (!findings.length) {
      reportTitle.textContent = worldText("cleanTitle", "Nenhuma correção necessária");
      reportContent.appendChild(textNode("p", "report-message",
        translated("cleanReport", "Não encontrei indicadores conhecidos que precisem de correção. O arquivo original continua intacto.")));
      if (!preserveDownload) clearDownload();
      return;
    }

    reportTitle.textContent = worldText("reasonTitle", "Conquistas estão desativadas neste mundo");
    reportContent.appendChild(textNode("p", "report-message",
      translated("foundReport", "Encontrei indicadores que podem ser corrigidos em uma cópia.")));
    list.className = "compact-findings";
    const seen = new Set();
    findings.forEach(function (item) {
      const key = item.key.toLowerCase();
      const group = key === "commandsenabled" || key === "cheatsenabled" ? "cheats"
        : key === "gametype" ? "mode"
        : key === "hasbeenloadedincreative" ? "creative-history"
        : key.indexOf("achievementsdisabled") !== -1 || key.indexOf("disableachievements") !== -1 ? "achievement-flag"
        : key;
      if (seen.has(group)) return;
      seen.add(group);
      const li = document.createElement("li");
      li.appendChild(textNode("span", "finding-title", propertyLabel(item.key, item.label)));
      list.appendChild(li);
    });
    reportContent.appendChild(list);

    planTitle.textContent = worldText("planTitle", "O que o World Rescue vai alterar");
    originalNote.textContent = worldText("originalSafe", "Seu mundo original continuará intacto.");
    const addPlanItem = function (key, fallback) {
      const item = document.createElement("li");
      item.className = "repair-plan-item";
      item.append(textNode("span", "repair-plan-check", "✓"), textNode("span", "", worldText(key, fallback)));
      planList.appendChild(item);
    };
    const has = function (predicate) { return findings.some(predicate); };
    if (has(function (item) { return item.key === "commandsEnabled" || item.key === "cheatsEnabled"; })) {
      addPlanItem("planCheats", "Desativar trapaças e comandos");
    }
    if (has(function (item) { return item.key === "GameType"; })) {
      addPlanItem("planMode", "Definir o modo de jogo como Sobrevivência");
    }
    if (has(function (item) { return item.key === "hasBeenLoadedInCreative"; })) {
      addPlanItem("planCreativeHistory", "Remover o registro de que o mundo foi aberto no Criativo");
    }
    if (has(function (item) { return /achievementsdisabled|disableachievements/i.test(item.key); })) {
      addPlanItem("planAchievementFlag", "Limpar o indicador de conquistas desativadas");
    }
    if (!planList.childElementCount) {
      findings.forEach(function (item) { addPlanItem("planAchievementFlag", propertyLabel(item.key, item.label)); });
    }
    planCard.classList.remove("hidden");
    actionRow.classList.remove("hidden");
    fixButton.disabled = false;
    fixButton.textContent = translated("fix", "Criar cópia corrigida");
    if (!preserveDownload) clearDownload();
  }

  function showDownloadReady() {
    planTitle.textContent = worldText("readyTitle", "Sua cópia corrigida está pronta");
    planList.classList.add("hidden");
    actionRow.classList.add("hidden");
    originalNote.textContent = worldText("originalSafe", "Seu mundo original continuará intacto.");
    downloadMessage.textContent = translated("downloadMessage", "A cópia está pronta. Baixe e importe no Minecraft.");
    downloadLink.textContent = worldText("downloadNow", translated("download", "Baixar mundo corrigido"));
    downloadRow.classList.remove("hidden");
  }
  function readU16(view, offset) {
    return view.getUint16(offset, true);
  }

  function parseNbt(levelBytes) {
    if (levelBytes.length < 10) throw new Error(translatedError("smallFile", "O arquivo level.dat é pequeno demais."));
    const header = new DataView(levelBytes.buffer, levelBytes.byteOffset, levelBytes.byteLength);
    const version = header.getUint32(0, true);
    const declaredLength = header.getUint32(4, true);
    if (!declaredLength || declaredLength > levelBytes.length - 8) {
      throw new Error(translatedError("header", "O cabeçalho do level.dat é inválido ou incompleto."));
    }

    const view = new DataView(levelBytes.buffer, levelBytes.byteOffset + 8, declaredLength);
    const decoder = new TextDecoder("utf-8", { fatal: false });
    let offset = 0;
    let parsedTags = 0;

    function take(length) {
      if (length < 0 || offset + length > view.byteLength) {
        throw new Error(translatedError("truncated", "O NBT está truncado ou contém um tamanho inválido."));
      }
      const start = offset;
      offset += length;
      return start;
    }
    function getString() {
      const length = view.getUint16(take(2), true);
      const start = take(length);
      return decoder.decode(new Uint8Array(view.buffer, view.byteOffset + start, length));
    }
    function getArray(length, bytesPerItem, makeItem) {
      if (length < 0 || length > 100000000 || length * bytesPerItem > view.byteLength - offset) {
        throw new Error(translatedError("array", "O NBT contém um array com tamanho inválido."));
      }
      const values = [];
      for (let i = 0; i < length; i++) values.push(makeItem());
      return values;
    }
    function payload(type, depth) {
      if (depth > 128) throw new Error(translatedError("depth", "O NBT excede a profundidade suportada."));
      switch (type) {
        case 1: return view.getInt8(take(1));
        case 2: return view.getInt16(take(2), true);
        case 3: return view.getInt32(take(4), true);
        case 4: {
          const start = take(8);
          return view.getBigInt64(start, true);
        }
        case 5: return view.getFloat32(take(4), true);
        case 6: return view.getFloat64(take(8), true);
        case 7: {
          const length = view.getInt32(take(4), true);
          return getArray(length, 1, function () { return view.getInt8(take(1)); });
        }
        case 8: return getString();
        case 9: {
          const elementType = view.getUint8(take(1));
          const length = view.getInt32(take(4), true);
          if (length < 0 || length > 10000000) throw new Error(translatedError("list", "A lista NBT contém um tamanho inválido."));
          const items = [];
          for (let i = 0; i < length; i++) items.push(payload(elementType, depth + 1));
          return { elementType: elementType, items: items };
        }
        case 10: {
          const children = [];
          while (true) {
            const childType = view.getUint8(take(1));
            if (childType === 0) break;
            if (childType > 12) throw new Error(translatedError("unknownType", "O arquivo usa um tipo NBT não reconhecido."));
            parsedTags++;
            if (parsedTags > 1000000) throw new Error(translatedError("tooManyTags", "O NBT contém tags demais."));
            const name = getString();
            children.push({ type: childType, name: name, value: payload(childType, depth + 1) });
          }
          return children;
        }
        case 11: {
          const length = view.getInt32(take(4), true);
          return getArray(length, 4, function () { return view.getInt32(take(4), true); });
        }
        case 12: {
          const length = view.getInt32(take(4), true);
          return getArray(length, 8, function () {
            const start = take(8);
            return view.getBigInt64(start, true);
          });
        }
        default: throw new Error(translatedError("unknownType", "O arquivo usa um tipo NBT não reconhecido."));
      }
    }

    const rootType = view.getUint8(take(1));
    if (rootType !== 10) throw new Error(translatedError("root", "A raiz do level.dat não é um compound NBT."));
    const rootName = getString();
    const root = payload(rootType, 0);
    return { version: version, rootName: rootName, root: root };
  }

  function writeNbt(parsed) {
    const encoder = new TextEncoder();
    let bytes = new Uint8Array(2048);
    let offset = 0;
    function ensure(count) {
      if (offset + count <= bytes.length) return;
      let size = bytes.length;
      while (size < offset + count) size *= 2;
      const expanded = new Uint8Array(size);
      expanded.set(bytes);
      bytes = expanded;
    }
    function putU8(value) {
      ensure(1);
      bytes[offset++] = value & 255;
    }
    function putU16(value) {
      ensure(2);
      new DataView(bytes.buffer).setUint16(offset, value, true);
      offset += 2;
    }
    function putI32(value) {
      ensure(4);
      new DataView(bytes.buffer).setInt32(offset, value, true);
      offset += 4;
    }
    function putI64(value) {
      ensure(8);
      new DataView(bytes.buffer).setBigInt64(offset, BigInt(value), true);
      offset += 8;
    }
    function putF32(value) {
      ensure(4);
      new DataView(bytes.buffer).setFloat32(offset, value, true);
      offset += 4;
    }
    function putF64(value) {
      ensure(8);
      new DataView(bytes.buffer).setFloat64(offset, value, true);
      offset += 8;
    }
    function putString(value) {
      const encoded = encoder.encode(value);
      if (encoded.length > 65535) throw new Error(translatedError("nameTooLong", "Um nome NBT ultrapassa o limite permitido."));
      putU16(encoded.length);
      ensure(encoded.length);
      bytes.set(encoded, offset);
      offset += encoded.length;
    }
    function putPayload(type, value) {
      switch (type) {
        case 1: putU8(value); break;
        case 2: ensure(2); new DataView(bytes.buffer).setInt16(offset, value, true); offset += 2; break;
        case 3: putI32(value); break;
        case 4: putI64(value); break;
        case 5: putF32(value); break;
        case 6: putF64(value); break;
        case 7:
          putI32(value.length);
          value.forEach(putU8);
          break;
        case 8: putString(value); break;
        case 9:
          putU8(value.elementType);
          putI32(value.items.length);
          value.items.forEach(function (item) { putPayload(value.elementType, item); });
          break;
        case 10:
          value.forEach(function (child) {
            putU8(child.type);
            putString(child.name);
            putPayload(child.type, child.value);
          });
          putU8(0);
          break;
        case 11:
          putI32(value.length);
          value.forEach(putI32);
          break;
        case 12:
          putI32(value.length);
          value.forEach(putI64);
          break;
        default: throw new Error(translatedError("saveType", "Não foi possível salvar um tipo NBT desconhecido."));
      }
    }
    putU8(10);
    putString(parsed.rootName);
    putPayload(10, parsed.root);
    const body = bytes.slice(0, offset);
    const result = new Uint8Array(8 + body.length);
    const header = new DataView(result.buffer);
    header.setUint32(0, parsed.version, true);
    header.setUint32(4, body.length, true);
    result.set(body, 8);
    return result;
  }

  function numericValue(tag) {
    if (!tag || tag.type < 1 || tag.type > 6) return null;
    return Number(tag.value);
  }

  function findTag(children, name) {
    const wanted = name.toLowerCase();
    return children.find(function (tag) { return tag.name.toLowerCase() === wanted; });
  }

  function inspect(parsed) {
    const findings = [];
    const blockers = [];
    const root = parsed.root;

    ["commandsEnabled", "cheatsEnabled", "hasBeenLoadedInCreative"].forEach(function (key) {
      const tag = findTag(root, key);
      const value = numericValue(tag);
      if (value !== null && value !== 0) {
        findings.push({ key: key, label: propertyLabel(key, labels[key]), tag: tag, replacement: 0 });
      }
    });

    const gameType = findTag(root, "GameType");
    const gameValue = numericValue(gameType);
    if (gameValue === 1 || gameValue === 6 || gameValue === 3) {
      findings.push({ key: "GameType", label: propertyLabel("GameType", labels.GameType), tag: gameType, replacement: 0 });
    }

    root.forEach(function (tag) {
      const key = tag.name.toLowerCase();
      if (key.indexOf("achievementsdisabled") !== -1 || key.indexOf("disableachievements") !== -1) {
        const value = numericValue(tag);
        if (value !== null && value !== 0 && !findings.some(function (item) { return item.tag === tag; })) {
          findings.push({ key: tag.name, label: propertyLabel(tag.name, labels[key] || "Indicador: " + tag.name), tag: tag, replacement: 0 });
        }
      }
    });

    const lockedKeys = ["isfromlockedtemplate", "haslockedbehaviorpack", "haslockedresourcepack"];
    lockedKeys.forEach(function (key) {
      const tag = findTag(root, key);
      const value = numericValue(tag);
      if (value !== null && value !== 0) {
        blockers.push({ type: "locked", name: tag.name });
      }
    });

    const experimentsEverUsed = findTag(root, "experiments_ever_used");
    if (numericValue(experimentsEverUsed) > 0) blockers.push({ type: "experiments-used" });
    const experiments = findTag(root, "experiments");
    if (experiments && experiments.type === 10) {
      const enabled = experiments.value.filter(function (tag) {
        const value = numericValue(tag);
        return value !== null && value !== 0;
      });
      if (enabled.length) blockers.push({ type: "experimental" });
    }

    const uniqueBlockers = [];
    const seenBlockers = new Set();
    blockers.forEach(function (item) {
      const signature = item.type + ":" + (item.name || "");
      if (!seenBlockers.has(signature)) {
        seenBlockers.add(signature);
        uniqueBlockers.push(item);
      }
    });
    return { findings: findings, blockers: uniqueBlockers };
  }

  async function loadWorld(file) {
    resetView();
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".mcworld")) {
      setStatus(translated("badFile", "Escolha um arquivo com extensão .mcworld."), "error", "badFile");
      return;
    }
    if (!window.fflate || typeof window.fflate.unzipSync !== "function") {
      setStatus(translated("badZip", "A biblioteca de arquivos ZIP não carregou. Abra a página com os arquivos da pasta juntos."), "error", "badZip");
      return;
    }
    setStatus(translated("reading", "Lendo e analisando o mundo…"), "working", "reading");
    lastErrorKey = null;
    try {
      const archiveBytes = new Uint8Array(await file.arrayBuffer());
      const files = window.fflate.unzipSync(archiveBytes);
      const levelCandidates = Object.keys(files).filter(function (path) {
        const normalized = path.replace(/\\/g, "/").toLowerCase();
        return normalized.split("/").pop() === "level.dat" && normalized.indexOf("__macosx/") !== 0;
      }).sort(function (a, b) { return a.length - b.length; });
      const levelPath = levelCandidates[0];
      if (!levelPath) {
        throw new Error(translated("missingLevel", "Não encontrei level.dat na raiz do .mcworld. Exporte o mundo novamente pelo Minecraft."));
      }
      const parsed = parseNbt(files[levelPath]);
      const result = inspect(parsed);
      const summary = worldMetadata(parsed, files, file, levelPath);
      current = { file: file, files: files, levelPath: levelPath, parsed: parsed, findings: result.findings, blockers: result.blockers, metadata: summary.metadata, iconUrl: summary.iconUrl };
      renderWorldSummary(current);
      document.body.classList.add("world-selected");
      pageMain.classList.add("world-selected");
      worldInfoCard.classList.remove("hidden");
      dropzone.classList.add("hidden");
      reportCard.classList.remove("hidden");
      renderReport(file, result.findings, result.blockers);
      worldInfoCard.scrollIntoView({ behavior: "smooth", block: "start" });
      if (result.blockers.length) setStatus(translated("blockedStatus", "Análise concluída: mundo preservado por segurança."), "warning", "blockedStatus");
      else if (result.findings.length) setStatus(translated("foundStatus", "Análise concluída: indicadores corrigíveis encontrados."), "success", "foundStatus");
      else setStatus(translated("cleanStatus", "Análise concluída: nenhum indicador conhecido encontrado."), "success", "cleanStatus");
      status.hidden = true;
    } catch (error) {
      if (current && current.iconUrl) URL.revokeObjectURL(current.iconUrl);
      current = null;
      worldInfoCard.classList.add("hidden");
      reportCard.classList.add("hidden");
      const message = error && error.message ? error.message : "Não foi possível ler este mundo.";
      setStatus(message, "error", message === translated("missingLevel", "") ? "missingLevel" : lastErrorKey);
    }
  }

  async function createFixedCopy() {
    if (!current || current.blockers.length || !current.findings.length || copyInProgress) return;
    copyInProgress = true;
    copyProgressDone = 0;
    copyProgressTotal = 0;
    lastCopyProgressValue = -1;
    actionRow.classList.add("is-processing");
    fixButton.disabled = true;
    fixButton.setAttribute("aria-busy", "true");
    setStatus(copyProgressText("preparing"), "working", "preparing");
    updateCopyProgress("preparing", 0, 0, true);
    if (copyProgress) copyProgress.focus({ preventScroll: true });
    lastErrorKey = null;
    setWorldChangeDisabled(true);
    try {
      await nextPaint();
      current.findings.forEach(function (finding) {
        finding.tag.value = finding.replacement;
      });
      const files = Object.assign({}, current.files);
      files[current.levelPath] = writeNbt(current.parsed);
      setStatus(copyProgressText("compressing"), "working", "creating");
      updateCopyProgress("compressing", 0, 0, true);
      await nextPaint();
      const result = await zipFilesWithProgress(files, function (done, total, phase) {
        updateCopyProgress(phase, done, total);
      });
      clearDownload();
      outputUrl = URL.createObjectURL(result);
      const baseName = current.file.name.replace(/\.mcworld$/i, "");
      downloadLink.href = outputUrl;
      downloadLink.download = baseName + "-reparado.mcworld";
      copyInProgress = false;
      actionRow.classList.remove("is-processing");
      if (copyProgress) copyProgress.classList.add("hidden");
      fixButton.removeAttribute("aria-busy");
      setWorldChangeDisabled(false);
      setStatus(translated("copySuccess", "Cópia pronta. O arquivo original não foi substituído."), "success", "copySuccess");
      status.hidden = true;
      showDownloadReady();
      planCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      downloadLink.focus({ preventScroll: true });
    } catch (error) {
      copyInProgress = false;
      actionRow.classList.remove("is-processing");
      if (copyProgress) copyProgress.classList.add("hidden");
      fixButton.disabled = false;
      fixButton.removeAttribute("aria-busy");
      fixButton.textContent = translated("retry", "Tentar criar cópia novamente");
      setWorldChangeDisabled(false);
      setStatus(error && error.message ? error.message : translated("copyFailed", "Falha ao criar a cópia."), "error", lastErrorKey || (error && error.message ? null : "copyFailed"));
      fixButton.focus({ preventScroll: true });
    }
  }

  input.addEventListener("change", function () { loadWorld(input.files && input.files[0]); });
  fixButton.addEventListener("click", createFixedCopy);

  dropzone.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropzone.classList.add("is-dragging");
  });
  dropzone.addEventListener("dragleave", function () { dropzone.classList.remove("is-dragging"); });
  dropzone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropzone.classList.remove("is-dragging");
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) loadWorld(file);
  });
  window.addEventListener("beforeunload", clearDownload);
}());
