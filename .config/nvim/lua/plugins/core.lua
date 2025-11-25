return {
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "catppuccin",
    },
  },
  {
    "catppuccin/nvim",
    name = "catppuccin",
    opts = {
      flavour = "mocha",
      transparent_background = true,
      float = {
        transparent = true,
      },
    },
    integrations = {
      aerial = true,
      alpha = true,
      cmp = true,
      dashboard = true,
      flash = true,
      fzf = true,
      grug_far = true,
      gitsigns = true,
      headlines = true,
      illuminate = true,
      indent_blankline = { enabled = true },
      leap = true,
      lsp_trouble = true,
      mason = true,
      mini = true,
      navic = { enabled = true, custom_bg = "lualine" },
      neotest = true,
      neotree = true,
      noice = true,
      notify = true,
      snacks = true,
      telescope = true,
      treesitter_context = true,
      which_key = true,
    },
  },
  {
    "folke/snacks.nvim",
    opts = function(_, opts)
      local sources = opts.picker.sources or {}
      local source_names = { "files", "explorer", "grep", "grep_word", "grep_buffers" }
      local source_opts = { hidden = true, ignored = true, exclude = { ".git", ".DS_Store" } }

      for _, name in ipairs(source_names) do
        sources[name] = source_opts
      end

      opts.picker.sources = sources

      return opts
    end,
  },
}
