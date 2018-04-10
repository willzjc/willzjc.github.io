import json
import pkgutil

from scattertext.Common import DEFAULT_D3_URL, DEFAULT_D3_SCALE_CHROMATIC


class InvalidProtocolException(Exception):
	pass


class HTMLVisualizationAssembly(object):
	def __init__(self,
	             visualization_data,
	             width_in_pixels=None,
	             height_in_pixels=None,
	             max_snippets=None,
	             color=None,
	             grey_zero_scores=False,
	             sort_by_dist=True,
	             reverse_sort_scores_for_not_category=True,
	             use_full_doc=False,
	             asian_mode=False,
	             use_non_text_features=False,
	             show_characteristic=True,
	             word_vec_use_p_vals=False,
	             max_p_val=0.1,
	             save_svg_button=False,
	             p_value_colors=False,
	             x_label=None,
	             y_label=None,
	             full_data=None,
	             show_top_terms=True,
	             show_neutral=False,
	             get_tooltip_content=None,
	             x_axis_values=None,
	             y_axis_values=None,
	             color_func=None,
	             show_axes=True,
	             show_extra=False,
	             ):
		'''

		Parameters
		----------
		visualization_data : dict
			From ScatterChart or a descendant
		width_in_pixels : int, optional
			width of viz in pixels, if None, default to 1000
		height_in_pixels : int, optional
			height of viz in pixels, if None, default to 600
		max_snippets : int, optional
			max snippets to snow when temr is clicked, Defaults to show all
		color : str, optional
		  d3 color scheme
		grey_zero_scores : bool, optional
		  If True, color points with zero-scores a light shade of grey.  False by default.
		sort_by_dist : bool, optional
			sort by distance or score, default True
		reverse_sort_scores_for_not_category : bool, optional
			If using a custom score, score the not-category class by
			lowest-score-as-most-predictive. Turn this off for word vectory
			or topic similarity. Default True.
		use_full_doc : bool, optional
			use full document instead of sentence in snippeting
		use_non_text_features : bool, default False
			Show non-bag-of-words features (e.g., Empath) instaed of text.  False by default.
		show_characteristic: bool, default True
			Show characteristic terms on the far left-hand side of the visualization
		word_vec_use_p_vals: bool, default False
			Use category-associated p-values to determine which terms to give word
			vec scores.
		max_p_val : float, default = 0.1
			Max p-val to use find set of terms for similarity calculation, if
			word_vec_use_p_vals is True.
		save_svg_button : bool, default False
			Add a save as SVG button to the page.
		p_value_colors : bool, default False
		  Color points differently if p val is above 1-max_p_val, below max_p_val, or
		   in between.
		x_label : str, default None
			If present, use as the x-axis label
		y_label : str, default None
			If present, use as the y-axis label
		full_data : str, default None
			Data used to create chart. By default "getDataAndInfo()".
		show_top_terms : bool, default True
			Show the top terms sidebar
		show_neutral : bool, default False
			Show a third column for matches in neutral documents
		get_tooltip_content : str, default None
			Javascript function to control content of tooltip.  Function takes a parameter
			which is a dictionary entry produced by `ScatterChartExplorer.to_dict` and
			returns a string.
		x_axis_values : list, default None
			Value-labels to show on x-axis. Low, medium, high are defaults.
		y_axis_values : list, default None
			Value-labels to show on y-axis. Low, medium, high are defaults.
		color_func : str, default None
			Javascript function to control color of a point.  Function takes a parameter
			which is a dictionary entry produced by `ScatterChartExplorer.to_dict` and
			returns a string.
		show_axes : bool, default True
			Show x and y axes
		show_extra : bool, default Bool
			Show extra fourth column
		'''
		self._visualization_data = visualization_data
		self._width_in_pixels = width_in_pixels if width_in_pixels is not None else 1000
		self._height_in_pixels = height_in_pixels if height_in_pixels is not None else 600
		self._max_snippets = max_snippets
		self._color = color
		self._sort_by_dist = sort_by_dist
		self._use_full_doc = use_full_doc
		self._asian_mode = asian_mode
		self._grey_zero_scores = grey_zero_scores
		self._use_non_text_features = use_non_text_features
		self._show_characteristic = show_characteristic
		self._word_vec_use_p_vals = word_vec_use_p_vals
		self._max_p_val = max_p_val
		self._save_svg_button = save_svg_button
		self._reverse_sort_scores_for_not_category = reverse_sort_scores_for_not_category
		self._p_value_colors = p_value_colors
		self._x_label = x_label
		self._y_label = y_label
		self._full_data = full_data
		self._show_top_terms = show_top_terms
		self._show_neutral = show_neutral
		self._get_tooltip_content = get_tooltip_content
		self._x_axis_values = x_axis_values
		self._y_axis_values = y_axis_values
		self._color_func = color_func
		self._show_axes = show_axes
		self._show_extra = show_extra

	def to_html(self,
	            protocol='http',
	            d3_url=None,
	            d3_scale_chromatic_url=None,
	            html_base=None):
		'''
		Parameters
		----------
		protocol : str
		 'http' or 'https' for including external urls
		d3_url, str
		  None by default.  The url (or path) of
		  d3, to be inserted into <script src="..."/>
		  By default, this is `DEFAULT_D3_URL` declared in `HTMLVisualizationAssembly`.
		d3_scale_chromatic_url : str
		  None by default.
		  URL of d3_scale_chromatic_url, to be inserted into <script src="..."/>
		  By default, this is `DEFAULT_D3_SCALE_CHROMATIC` declared in `HTMLVisualizationAssembly`.
		html_base : str
			None by default.  HTML of semiotic square to be inserted above plot.

		Returns
		-------
		str, the html file representation

		'''
		self._ensure_valid_protocol(protocol)
		javascript_to_insert = '\n'.join([
			self._full_content_of_javascript_files(),
			self._visualization_data.to_javascript(),
			self._call_build_visualization_in_javascript()
		])

		if d3_url is None:
			d3_url = DEFAULT_D3_URL

		if d3_scale_chromatic_url is None:
			d3_scale_chromatic_url = DEFAULT_D3_SCALE_CHROMATIC

		html_content = ((
			self._full_content_of_html_file()
			if html_base is None
			else self._format_html_base(html_base))
			.replace('<!-- INSERT SCRIPT -->', javascript_to_insert, 1)
			.replace('<!--D3URL-->', d3_url, 1)
			.replace('<!--D3SCALECHROMATIC-->', d3_scale_chromatic_url)
			# .replace('<!-- INSERT D3 -->', self._get_packaged_file_content('d3.min.js'), 1)
			)
		'''
		if html_base is not None:
			html_file = html_file.replace('<!-- INSERT SEMIOTIC SQUARE -->',
			                              html_base)
		'''

		extra_libs = ''
		if self._save_svg_button:
			# extra_libs = '<script src="https://cdn.rawgit.com/edeno/d3-save-svg/gh-pages/assets/d3-save-svg.min.js" charset="utf-8"></script>'
			extra_libs = ''
		html_content = (html_content
			.replace('<!-- EXTRA LIBS -->', extra_libs, 1)
			.replace('http://', protocol + '://'))
		return html_content

	def _format_html_base(self, html_base):
		return html_base.replace('{width}', str(self._width_in_pixels)).replace('{height}', str(self._height_in_pixels))

	def _ensure_valid_protocol(self, protocol):
		if protocol not in ('https', 'http'):
			raise InvalidProtocolException(
				"Invalid protocol: %s.  Protocol must be either http or https." % (protocol))

	def _full_content_of_html_file(self):
		return pkgutil.get_data('scattertext',
		                        'data/viz/scattertext.html').decode('utf-8')

	def _full_content_of_javascript_files(self):
		return '; \n \n '.join([self._get_packaged_file_content(script_name)
		                        for script_name in [
			                        # 'd3.min.js',
			                        # 'd3-scale-chromatic.v1.min.js',
			                        'rectangle-holder.js',  # 'range-tree.js',
			                        'main.js',
		                        ]])

	def _get_packaged_file_content(self, file_name):
		return pkgutil.get_data('scattertext',
		                        'data/viz/scripts/' + file_name).decode('utf-8')

	def _call_build_visualization_in_javascript(self):
		def js_default_value(x):
			return 'undefined' if x is None else str(x)

		def js_default_string(x):
			return 'undefined' if x is None else json.dumps(str(x))

		def js_default_value_to_null(x):
			return 'null' if x is None else str(x)

		def js_bool(x):
			return 'true' if x else 'false'

		def js_float(x):
			return str(float(x))

		def js_default_full_data(full_data):
			return full_data if full_data is not None else "getDataAndInfo()"

		arguments = [js_default_value(self._width_in_pixels),
		             js_default_value(self._height_in_pixels),
		             js_default_value_to_null(self._max_snippets),
		             js_default_value_to_null(self._color),
		             js_bool(self._sort_by_dist),
		             js_bool(self._use_full_doc),
		             js_bool(self._grey_zero_scores),
		             js_bool(self._asian_mode),
		             js_bool(self._use_non_text_features),
		             js_bool(self._show_characteristic),
		             js_bool(self._word_vec_use_p_vals),
		             js_bool(self._save_svg_button),
		             js_bool(self._reverse_sort_scores_for_not_category),
		             js_float(self._max_p_val),
		             js_bool(self._p_value_colors),
		             js_default_string(self._x_label),
		             js_default_string(self._y_label),
		             js_default_full_data(self._full_data),
		             js_bool(self._show_top_terms),
		             js_bool(self._show_neutral),
		             js_default_value_to_null(self._get_tooltip_content),
		             js_default_value_to_null(self._x_axis_values),
		             js_default_value_to_null(self._y_axis_values),
		             js_default_value_to_null(self._color_func),
		             js_bool(self._show_axes),
		             js_bool(self._show_extra)]
		return 'plotInterface = buildViz(' + ','.join(arguments) + ');'
