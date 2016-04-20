package inline_edit

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/qor/i18n"
)

func enabledInlineEdit(request *http.Request) bool {
	return true
}

func GenerateFuncMaps(I18n *i18n.I18n, locale string, request *http.Request) template.FuncMap {
	return template.FuncMap{
		"t": inlineEdit(I18n, locale, enabledInlineEdit(request)),
	}
}

func inlineEdit(I18n *i18n.I18n, locale string, isInline bool) func(string, ...interface{}) template.HTML {
	return func(key string, args ...interface{}) template.HTML {
		// Get Translation Value
		var value template.HTML
		var defaultValue string
		if len(args) > 0 {
			if args[0] == nil {
				defaultValue = key
			} else {
				defaultValue = fmt.Sprint(args[0])
			}
			value = I18n.Default(defaultValue).T(locale, key, args[1:]...)
		} else {
			value = I18n.T(locale, key)
		}

		// Append inline-edit script/tag
		if isInline {
			var editType string
			if len(value) > 25 {
				editType = "data-type=\"textarea\""
			}
			prefix := I18n.Resource.GetAdmin().GetRouter().Prefix
			assetsTag := fmt.Sprintf("<script data-prefix=\"%v\" src=\"%v/assets/javascripts/i18n-checker.js?theme=i18n\"></script>", prefix, prefix)
			return template.HTML(fmt.Sprintf("%s<span class=\"qor-i18n-inline\" %s data-locale=\"%s\" data-key=\"%s\">%s</span>", assetsTag, editType, locale, key, string(value)))
		}
		return value
	}
}
