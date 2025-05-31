'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var shortcutsExtender = /** @class */ (function (_super) {
    __extends(shortcutsExtender, _super);
    function shortcutsExtender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    shortcutsExtender.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log(this.app);
                this.addCommand({
                    id: "shortcut-exclamation-mark",
                    name: "Shortcut for ! symbol",
                    callback: function () { return _this.shortcutExclamationMark(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "1",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-At",
                    name: "Shortcut for @ symbol",
                    callback: function () { return _this.shortcutAt(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "2",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-hash",
                    name: "Shortcut for # symbol",
                    callback: function () { return _this.shortcutHash(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "3",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-dollar",
                    name: "Shortcut for $ symbol",
                    callback: function () { return _this.shortcutDollar(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "4",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-percent",
                    name: "Shortcut for % symbol",
                    callback: function () { return _this.shortcutPercent(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "5",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-circumflex",
                    name: "Shortcut for ^ symbol",
                    callback: function () { return _this.shortcutCircumflex(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "6",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-ampersand",
                    name: "Shortcut for & symbol",
                    callback: function () { return _this.shortcutAmpersand(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "7",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-less-than",
                    name: "Shortcut for < symbol",
                    callback: function () { return _this.shortcutLessThan(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "б",
                        },
                        {
                            modifiers: ["Alt"],
                            key: ",",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-greater-than",
                    name: "Shortcut for > symbol",
                    callback: function () { return _this.shortcutGreaterThan(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "ю",
                        },
                        {
                            modifiers: ["Alt"],
                            key: ".",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-left-square-bracket",
                    name: "Shortcut for [ symbol",
                    callback: function () { return _this.shortcutLeftSquareBracket(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "х",
                        },
                        {
                            modifiers: ["Alt"],
                            key: "[",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-right-square-bracket",
                    name: "Shortcut for ] symbol",
                    callback: function () { return _this.shortcutRightSquareBracket(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "ъ",
                        },
                        {
                            modifiers: ["Alt"],
                            key: "]",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-python-code",
                    name: "Shortcut for .py code fences",
                    callback: function () { return _this.shortcutPyCode(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "ё",
                        },
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "~",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-code",
                    name: "Shortcut for code fences (`)",
                    callback: function () { return _this.shortcutCodeFences(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "ё",
                        },
                        {
                            modifiers: ["Alt"],
                            key: "`",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-code-block",
                    name: "Shortcut for toggling a code block",
                    callback: function () { return _this.shortcutToggleCodeBlock(); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "`",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-left-curly-bracket",
                    name: "Shortcut for { symbol",
                    callback: function () { return _this.shortcutLeftCurlyBracket(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "х",
                        },
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "{",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-right-curly-bracket",
                    name: "Shortcut for } symbol",
                    callback: function () { return _this.shortcutRightCurlyBracket(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "ъ",
                        },
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "}",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-Vertical-Line",
                    name: "Shortcut for | symbol",
                    callback: function () { return _this.shortcutVerticalLine(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "|",
                        },
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "\/",
                        },
                    ],
                });
                this.addCommand({
                    id: "shortcut-list-items",
                    name: "Creating list item from text",
                    callback: function () { return _this.shortcutListItems(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt"],
                            key: "-",
                        },
                    ],
                });
                this.addCommand({
                    id: "heading-1",
                    name: "line into level 1 heading",
                    callback: function () { return _this.shortcutHeaderN(1); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "1",
                        },
                    ],
                });
                this.addCommand({
                    id: "heading-2",
                    name: "line into level 2 heading",
                    callback: function () { return _this.shortcutHeaderN(2); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "2",
                        },
                    ],
                });
                this.addCommand({
                    id: "heading-3",
                    name: "line into level 3 heading",
                    callback: function () { return _this.shortcutHeaderN(3); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "3",
                        },
                    ],
                });
                this.addCommand({
                    id: "heading-4",
                    name: "line into level 4 heading",
                    callback: function () { return _this.shortcutHeaderN(4); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "4",
                        },
                    ],
                });
                this.addCommand({
                    id: "heading-5",
                    name: "line into level 5 heading",
                    callback: function () { return _this.shortcutHeaderN(5); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "5",
                        },
                    ],
                });
                this.addCommand({
                    id: "heading-6",
                    name: "line into level 6 heading",
                    callback: function () { return _this.shortcutHeaderN(6); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "6",
                        },
                    ],
                });
                this.addCommand({
                    id: "heading-0",
                    name: "clearing of text formatting",
                    callback: function () { return _this.shortcutHeaderN(0); },
                    hotkeys: [
                        {
                            modifiers: ["Ctrl"],
                            key: "0",
                        },
                    ],
                });
                return [2 /*return*/];
            });
        });
    };
    shortcutsExtender.prototype.getSelectedText = function (editor) {
        //thanks to user "Argentina Ortega Sáinz" from the Obsidian community for this feature
        //For a long time I tried to do without such an approach, which resulted in several bugs and the impossibility of fixing them with non-crutches
        if (editor.somethingSelected()) {
            var cursorStart = editor.getCursor('from');
            var cursorEnd = editor.getCursor('to');
            var content = editor.getRange({ line: cursorStart.line, ch: 0 }, { line: cursorEnd.line, ch: editor.getLine(cursorEnd.line).length });
            return {
                start: { line: cursorStart.line, ch: 0 },
                end: {
                    line: cursorEnd.line,
                    ch: editor.getLine(cursorEnd.line).length,
                },
                content: content,
            };
        }
        else {
            // Toggle the todo in the line
            var lineNr = editor.getCursor().line;
            var contents = editor.getDoc().getLine(lineNr);
            var cursorStart = {
                line: lineNr,
                ch: 0,
            };
            var cursorEnd = {
                line: lineNr,
                ch: contents.length,
            };
            var content = editor.getRange(cursorStart, cursorEnd);
            return { start: cursorStart, end: cursorEnd, content: content };
        }
    };
    shortcutsExtender.prototype.shortcutExclamationMark = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("!");
    };
    shortcutsExtender.prototype.shortcutAt = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("@");
    };
    shortcutsExtender.prototype.shortcutHash = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("#");
    };
    shortcutsExtender.prototype.shortcutDollar = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("$");
    };
    shortcutsExtender.prototype.shortcutPercent = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("%");
    };
    shortcutsExtender.prototype.shortcutCircumflex = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("^");
    };
    shortcutsExtender.prototype.shortcutAmpersand = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("&");
    };
    shortcutsExtender.prototype.shortcutLessThan = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        var selectedText = editor.somethingSelected()
            ? editor.getSelection()
            : false;
        if (selectedText) {
            editor.replaceSelection("<".concat(selectedText, ">"));
        }
        else
            editor.replaceSelection("<");
    };
    shortcutsExtender.prototype.shortcutGreaterThan = function () {
        var activeLeaf = this.app.workspace.activeLeaf;
        var editor = activeLeaf.view.sourceMode.cmEditor;
        var selectedText = this.getSelectedText(editor);
        var resultText = "> " + selectedText.content.split('\n').join("\n> ");
        editor.replaceRange(resultText, selectedText.start, selectedText.end);
    };
    shortcutsExtender.prototype.shortcutLeftSquareBracket = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        var selectedText = editor.somethingSelected()
            ? editor.getSelection()
            : false;
        if (selectedText) {
            editor.replaceSelection("[[".concat(selectedText, "]]"));
        }
        else
            editor.replaceSelection("[");
    };
    shortcutsExtender.prototype.shortcutRightSquareBracket = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("]");
    };
    shortcutsExtender.prototype.shortcutPyCode = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        var selectedText = editor.somethingSelected()
            ? editor.getSelection()
            : false;
        if (selectedText) {
            editor.replaceSelection("```py\n".concat(selectedText, "\n```"));
        }
        else
            editor.replaceSelection("`");
    };
    shortcutsExtender.prototype.shortcutCodeFences = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        var selectedText = editor.somethingSelected()
            ? editor.getSelection()
            : false;
        if (selectedText) {
            editor.replaceSelection("`".concat(selectedText, "`"));
        }
        else
            editor.replaceSelection("`");
    };
    shortcutsExtender.prototype.shortcutToggleCodeBlock = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        var selectedText = editor.somethingSelected() ? editor.getSelection() : "";
        var startCursor = editor.getCursor('from');
        var firstLine = editor.getLine(startCursor.line);
        var endCursor = editor.getCursor('to');
        var lastLine = editor.getLine(endCursor.line);
        // If the selections starts with ```, then we should remove the code block.
        var isCodeBlock = firstLine.startsWith("```") && lastLine.endsWith("```")
            && selectedText.length >= 6;
        if (isCodeBlock) {
            // Position of first non-whitespace
            var textStartPos = selectedText.search("\\s\\S") + 1;
            if (textStartPos < 0) {
                textStartPos = 3;
            }
            // Remove the code block formatting.
            var endPos = selectedText.length - 3;
            var innerText = selectedText.substring(textStartPos, endPos);
            editor.replaceSelection(innerText);
        }
        else {
            editor.replaceSelection("```\n".concat(selectedText, "\n```"));
            startCursor.ch = 3; // Move cursor after ```
            editor.setCursor(startCursor);
        }
    };
    shortcutsExtender.prototype.shortcutRightCurlyBracket = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("}");
    };
    shortcutsExtender.prototype.shortcutLeftCurlyBracket = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        var selectedText = editor.somethingSelected()
            ? editor.getSelection()
            : false;
        if (selectedText) {
            editor.replaceSelection("{".concat(selectedText, "}"));
        }
        else
            editor.replaceSelection("{");
    };
    shortcutsExtender.prototype.shortcutVerticalLine = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        editor.somethingSelected()
            ? editor.getSelection()
            : false;
        editor.replaceSelection("|");
    };
    shortcutsExtender.prototype.shortcutListItems = function () {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        var selectedText = this.getSelectedText(editor);
        var resultText = "- " + selectedText.content.split('\n').join("\n- ");
        var resultTextCheck = resultText;
        while (resultTextCheck.search("- - ") >= 0) {
            resultTextCheck = resultTextCheck.replace("- - ", "	- ");
        }
        while (resultTextCheck.search("- 		") >= 0) {
            resultTextCheck = resultTextCheck.replace("- 		", "	- 	");
        }
        while (resultTextCheck.search("- 	- ") >= 0) {
            resultTextCheck = resultTextCheck.replace("- 	- ", "		- ");
        }
        editor.replaceRange(resultTextCheck, selectedText.start, selectedText.end);
    };
    shortcutsExtender.prototype.removeFormatSymbolsFromStr = function (line) {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        // Remove symbols we don't want at the beginning of the line.
        while (line.substring(0, 2) == "##") {
            line = line.replace("##", "#");
        }
        while (line.substring(0, 2) == "# ") {
            line = line.substr(2);
        }
        while (line.substring(0, 2) == "> ") {
            line = line.substr(2);
        }
        while (line.substring(0, 2) == "		") {
            line = line.replace("		", "	");
        }
        while (line.substring(0, 3) == "	- ") {
            line = line.substr(3);
        }
        while (line.substring(0, 2) == "- ") {
            line = line.substr(2);
        }
        var re_digits = /^\d\.\s/;
        line = line.replace(re_digits, "");
        return line;
    };
    shortcutsExtender.prototype.addHeadingToStr = function (line, headingLevel) {
        var space = " ";
        if (headingLevel == 0) {
            space = "";
        }
        return "#".repeat(headingLevel) + space + line;
    };
    shortcutsExtender.prototype.shortcutHeaderN = function (headingLevel) {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        // Apply heading level to each line.
        var selections = editor.listSelections();
        for (var i = 0; i < selections.length; i++) {
            this.shortcutHeaderNSingleSelection(headingLevel, selections[i]);
        }
        // setSelections is called to preserve the location of each cursor relative
        // to the end of the line.
        editor.setSelections(selections);
    };
    // shortcutHeaderNSingleSelection sets all lines in the selection to the 
    // desired heading level. selection is also updated to maintain the cursor
    // position relative to the end of the line.
    shortcutsExtender.prototype.shortcutHeaderNSingleSelection = function (headingLevel, selection) {
        var _a;
        var editor = (_a = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)) === null || _a === void 0 ? void 0 : _a.editor;
        if (editor == null) {
            return;
        }
        // Save anchor/head distance from end.
        var anchorDistFromEnd = editor.getLine(selection.anchor.line).length - selection.anchor.ch;
        var headDistFromEnd = editor.getLine(selection.head.line).length - selection.head.ch;
        // Get from and to line numbers.
        var fromLine = selection.anchor.line;
        var toLine = selection.head.line;
        var increment = fromLine <= toLine ? 1 : -1;
        // For each line in the selection, set the heading level.
        var lineNum = fromLine;
        while (true) {
            // Update the current line.
            var line = editor.getLine(lineNum);
            line = this.removeFormatSymbolsFromStr(line);
            line = this.addHeadingToStr(line, headingLevel);
            editor.setLine(lineNum, line);
            // Move to next line if not done.
            if (lineNum == toLine) {
                break;
            }
            lineNum += increment;
        }
        // Preserve anchor/head locations relative to line end.
        selection.anchor.ch = editor.getLine(selection.anchor.line).length - anchorDistFromEnd;
        selection.head.ch = editor.getLine(selection.head.line).length - headDistFromEnd;
    };
    return shortcutsExtender;
}(obsidian.Plugin));

module.exports = shortcutsExtender;


/* nosourcemap */